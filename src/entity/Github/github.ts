import { Subject } from "../../utils";
import { getIssues } from "../../api/github";

class GithubController {
  issues$: Subject<any[]> = new Subject([]);
  issuesError$: Subject<boolean> = new Subject(false);
  issuesLoading$: Subject<boolean> = new Subject(false);

  getIssues() {
    if (this.issues$.getValue().length) return;

    this.issuesLoading$.next(true);

    getIssues()
      .then((issues) => this.issues$.next(issues))
      .catch(() => this.issuesError$.next(true))
      .finally(() => this.issuesLoading$.next(false));
  }
}

export const githubController = new GithubController();
