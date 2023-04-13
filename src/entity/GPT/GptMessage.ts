import { sig, Signal } from "dignals";
import { GPTRoles } from "./types";

export class GptMessage {
  content$: Signal<string>;

  constructor(
    message: string,
    public role: GPTRoles,
    public inLocal?: boolean
  ) {
    this.content$ = sig(message);
  }

  onSetMessageContent = (value: string) => {
    this.content$.set(this.content$.get() + value);
  };
}
