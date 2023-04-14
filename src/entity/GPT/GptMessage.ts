import { sig, Signal } from "dignals";
import { GPTRoles } from "./types";

export class GptMessage {
  content$: Signal<string>;
  isSelected$ = sig<boolean>(false);

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

  toggleSelected() {
    this.isSelected$.set(!this.isSelected$.get());
  }
}
