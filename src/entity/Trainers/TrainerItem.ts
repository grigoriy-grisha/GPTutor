import { sig } from "dignals";
import { ChatGptTrainer } from "$/entity/GPT/ChatGptTrainer";
import { ModeType } from "$/entity/lessons";

export class TrainerItem {
  value$ = sig("");

  header = "Тренажер";
  gptInstance = new ChatGptTrainer();
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
    this.gptInstance.messages$.set([]);
  }

  initTrainer(value: string) {
    this.value$.set(value);
    this.gptInstance.messages$.set([]);
  }

  init() {
    this.gptInstance.init(this.systemMessage);
  }
}
