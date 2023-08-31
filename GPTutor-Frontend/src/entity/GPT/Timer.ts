import { sig, Signal } from "dignals";

export type TimerStrategy = "increment" | "decrement";

export class Timer {
  time$: Signal<number>;
  isStopped$: Signal<boolean> = sig(true);

  private intervalId: NodeJS.Timeout | undefined;

  constructor(
    private start: number,
    private finish: number,
    private timerStrategy: TimerStrategy
  ) {
    this.time$ = sig(start);
  }

  run() {
    this.time$ = sig(this.start);
    this.isStopped$.set(false);
    this.intervalId = setInterval(() => {
      this.processTime();
      this.check();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isStopped$.set(true);
  }

  private check() {
    if (this.time$.get() === this.finish) this.stop();
  }

  private processTime() {
    if (this.timerStrategy === "increment") {
      this.time$.set(this.time$.get() + 1);
    } else {
      this.time$.set(this.time$.get() - 1);
    }
  }
}
