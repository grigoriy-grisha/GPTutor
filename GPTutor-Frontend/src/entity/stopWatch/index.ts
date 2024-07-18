import { sig, Signal } from "dignals";

export class StopWatch {
  time$: Signal<number>;
  isStopped$: Signal<boolean> = sig(true);
  startDate = new Date();

  listener: ((value: number) => void) | null = null;

  listenOnChange(fn: (value: number) => void) {
    this.listener = fn;
  }

  private intervalId: NodeJS.Timeout | undefined;

  constructor() {
    this.time$ = sig(0);
  }

  run() {
    this.startDate = new Date();
    this.time$ = sig(0);
    this.isStopped$.set(false);
    this.intervalId = setInterval(() => {
      this.processTime();
      this.listener && this.listener(this.time$.get());
    }, 10);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isStopped$.set(true);
  }

  private processTime() {
    this.time$.set(new Date().getTime() - this.startDate.getTime());
  }
}
