import ReactivePromise from "$/services/ReactivePromise";
import { leetcodeDetailProblems, leetcodeProblems } from "$/api/leetcode";
import { DetailProblem, Problem } from "$/entity/leetCode/types";
import { sig } from "dignals";

const page = 30;

class LeetCode {
  currentProblem: DetailProblem | null = null;

  pageNumber = 0;
  problems: Problem[] = [];

  currentProblemSlug = "";

  pagedProblems$ = sig<Problem[]>([]);
  filteredPagedProblems$ = sig<Problem[]>([]);
  leetcodeProblems$ = ReactivePromise.create(leetcodeProblems);

  leetcodeDetailProblems$ = ReactivePromise.create(leetcodeDetailProblems);

  loadProblems = async () => {
    this.pageNumber = 0;
    this.filteredPagedProblems$.set([]);
    this.pagedProblems$.set([]);

    const problems = await this.leetcodeProblems$.run();

    this.problems = problems;
    this.pagedProblems$.set(problems.slice(this.pageNumber, page));
    this.filteredPagedProblems$.set(this.pagedProblems$.get());
  };

  nextLoadProblems = () => {
    this.pageNumber++;
    this.pagedProblems$.set([
      ...this.pagedProblems$.get(),
      ...this.problems.slice(this.pageNumber, page * this.pageNumber + 1),
    ]);
    this.filteredPagedProblems$.set(this.pagedProblems$.get());
  };

  async loadDetailProblem(slug: string) {
    this.currentProblemSlug = slug;
    this.currentProblem = await this.leetcodeDetailProblems$.run(slug);
  }

  searchLProblem(search: string) {
    if (search.length < 3) {
      this.filteredPagedProblems$.set(this.pagedProblems$.get());
      return;
    }

    const regExp = new RegExp(search.toLowerCase(), "g");

    this.filteredPagedProblems$.set(
      this.pagedProblems$
        .get()
        .filter((item) => regExp.test(item.stat.question__title.toLowerCase()))
    );
  }
}

export const leetCode = new LeetCode();
