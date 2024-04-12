import { sig } from "dignals";

export class ChangeHistoryTitle {
  edit$ = sig(false);
  error$ = sig(false);
  title$ = sig("");

  constructor(public defaultTitle: string) {
    this.title$.set(defaultTitle);
  }
}
