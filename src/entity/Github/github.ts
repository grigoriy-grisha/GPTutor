import { getIssues } from "../../api/github";
import { sig, batch, Signal, memo } from "dignals";

class ReactivePromise<DATA> {
  public result = sig<any | undefined>();
  public error = sig<Error | undefined>();
  public loading = sig(false);

  private fn?: () => Promise<DATA>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static create<DATA>(fn?: () => Promise<DATA>) {
    const reactivePromise = new ReactivePromise<DATA>();
    fn && reactivePromise.setRunFn(fn);
    return reactivePromise;
  }

  setRunFn(fn: () => Promise<DATA>) {
    this.fn = fn;
  }

  run() {
    this.reset();
    if (!this.fn) return;

    this.loading.set(true);
    this.fn()
      .then(result => this.result.set(result))
      .catch(err => {
        this.error.set(err);
      })
      .finally(() => {
        this.loading.set(false);
      })
  }

  reset() {
    batch(() => {
      this.result.set(undefined);
      this.error.set(undefined);
      this.loading.set(false);
    });
  }
}

class GithubController {
  public getIssues$: ReactivePromise<any>;
  public issues: Signal<any[]>;

  constructor() {
    this.getIssues$ = ReactivePromise.create(() => getIssues());
    this.issues = memo<any[]>(() => this.getIssues$.result.get() || []);
  }

  getIssues() {
    if (this.issues.get().length) return;
    this.getIssues$.run();
  }
}

export const githubController = new GithubController();
