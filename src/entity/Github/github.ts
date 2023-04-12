import { Signal, memo } from "dignals";

import { getIssues } from "../../api/github";
import ReactivePromise from "../../services/ReactivePromise";

class GithubController {
  public issues: Signal<any[]>;

  constructor() {
    this.issues = memo(() => this.getIssues$.result.get() || []);
  }

  getIssues$ = ReactivePromise.create(() => getIssues());

  getIssues() {
    if (this.issues.get().length) return;
    this.getIssues$.run();
  }
}

export const githubController = new GithubController();
