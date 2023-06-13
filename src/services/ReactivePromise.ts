import { batch, sig } from "dignals";

export default class ReactivePromise<DATA, ARGS extends any[]> {
  public result = sig<any | undefined>();
  public success = sig<boolean>();
  public done = sig<boolean>(false);
  public error = sig<Error | undefined>();
  public loading = sig(false);

  private readonly fn: (...args: ARGS) => Promise<DATA>;

  private constructor(fn: (...args: ARGS) => Promise<DATA>) {
    this.fn = fn;
  }

  static create<DATA, ARGS extends any[]>(
    fn: (...args: ARGS) => Promise<DATA>
  ) {
    return new ReactivePromise<DATA, ARGS>(fn);
  }

  run(...args: ARGS): Promise<DATA> {
    this.reset();

    const promise = new Promise<DATA>((resolve, reject) => {
      this.fn(...args)
        .then((result) => {
          const error = (result as any).error;
          const status = (result as any).status;

          if (error && status !== 200) {
            throw new Error(error);
          }

          this.success.set(true);
          this.result.set(result);
          resolve(result);
        })
        .catch((err) => {
          this.success.set(false);
          this.error.set(err);
          reject(err);
        });
    });

    this.loading.set(true);

    return promise.finally(() => {
      this.done.set(true);
      this.loading.set(false);
    });
  }

  reset() {
    batch(() => {
      this.result.set(undefined);
      this.error.set(undefined);
      this.loading.set(false);
      this.success.set(false);
      this.done.set(false);
    });
  }
}
