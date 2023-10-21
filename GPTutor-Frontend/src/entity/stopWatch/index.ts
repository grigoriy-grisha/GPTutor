import { sig, Signal } from "dignals";

export class StopWatch {
  time$: Signal<number>;
  isStopped$: Signal<boolean> = sig(true);
  startDate = new Date();

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
