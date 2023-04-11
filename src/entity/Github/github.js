import { getIssues } from "../../api/github";
import { sig } from "dignals";

class GithubController {
  constructor() {
    this.issues = sig([]);
    this.issuesError = sig(false);
    this.issuesLoading = sig(false);
  }

  getIssues() {
    if (this.issues.get().length) return;

    this.issuesLoading.set(true);

    getIssues()
      .then((issues) => {
        this.issues.set(issues);
      })
      .catch(() => this.issuesError.set(true))
      .finally(() => this.issuesLoading.set(false));
  }
}

export const githubController = new GithubController();
