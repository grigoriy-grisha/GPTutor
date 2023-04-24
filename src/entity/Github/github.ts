import { Signal, memo } from "dignals";

import { getIssues, getRepository } from "../../api/github";
import ReactivePromise from "../../services/ReactivePromise";

class GithubController {
  public issues: Signal<any[]>;
  public repository: Signal<any>;

  constructor() {
    this.issues = memo(() => this.getIssues$.result.get() || []);
    this.repository = memo(() => this.getRepository$.result.get());
  }

  getIssues$ = ReactivePromise.create(() => getIssues());
  getRepository$ = ReactivePromise.create(() => getRepository());

  getIssues() {
    if (this.issues.get().length) return;
    this.getIssues$.run();
  }

  getRepository() {
    if (this.repository.get()) return;
    this.getRepository$.run();
  }
}

//todo storage
export const githubController = new GithubController();
