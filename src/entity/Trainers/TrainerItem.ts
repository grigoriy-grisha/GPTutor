import { sig } from "dignals";
import { ModeType } from "$/entity/lessons";

export class TrainerItem {
  value$ = sig("");

  header = "Тренажер";

  constructor(
    public type: ModeType,
    public language: string,
    public systemMessage: string,

    public initialValue: string
  ) {
    this.init();
  }

  setInitialValue() {
    this.value$.set(this.initialValue);
  }

  initTrainer(value: string) {
    this.value$.set(value);
  }

  init() {}
}
