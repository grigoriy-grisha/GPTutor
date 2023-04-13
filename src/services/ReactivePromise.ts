import { batch, sig } from "dignals";

export default class ReactivePromise<DATA> {
  public result = sig<any | undefined>();
  public error = sig<Error | undefined>();
  public loading = sig(false);

  private fn?: () => Promise<DATA>;

  private constructor() {}

  static create<DATA>(fn?: () => Promise<DATA>) {
    const reactivePromise = new ReactivePromise<DATA>();
    fn && reactivePromise.setRunFn(fn);
    return reactivePromise;
  }

  setRunFn(fn: () => Promise<DATA>) {
    this.fn = fn;
  }

  async run() {
    this.reset();
    if (!this.fn) throw new Error("Не передан fn!");

    this.loading.set(true);
    return this.fn()
      .then((result) => {
        this.result.set(result);
        return result;
      })
      .catch((err) => this.error.set(err))
      .finally(() => this.loading.set(false));
  }

  reset() {
    batch(() => {
      this.result.set(undefined);
      this.error.set(undefined);
      this.loading.set(false);
    });
  }
}
