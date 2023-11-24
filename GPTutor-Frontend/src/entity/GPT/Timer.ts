import { sig, Signal } from "dignals";

export type TimerStrategy = "increment" | "decrement";

export class Timer {
  time$: Signal<number>;
  isStopped$: Signal<boolean> = sig(true);

  private intervalId: NodeJS.Timeout | undefined;

  constructor(
    private start: number,
    private finish: number,
    private timerStrategy: TimerStrategy,
    private timeout: number = 1000,
    private value: number = 1
  ) {
    this.time$ = sig(start);
  }

  isDisabled = false;

  setDisabled = () => {
    this.isDisabled = true;
  };

  run() {
    if (this.isDisabled) return;

    this.time$ = sig(this.start);
    this.isStopped$.set(false);
    this.intervalId = setInterval(() => {
      this.processTime();
      this.check();
    }, this.timeout);
  }

  stop() {
    if (this.isDisabled) return;

    clearInterval(this.intervalId);
    this.isStopped$.set(true);
  }

  private check() {
    if (this.time$.get() === this.finish) this.stop();
  }

  private processTime() {
    if (this.timerStrategy === "increment") {
      this.time$.set(this.time$.get() + this.value);
    } else {
      this.time$.set(this.time$.get() - this.value);
    }
  }
}
