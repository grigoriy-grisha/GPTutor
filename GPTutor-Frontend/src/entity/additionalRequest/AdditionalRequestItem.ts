import { sig } from "dignals";

export class AdditionalRequestItem {
  message$ = sig("");
  title$ = sig("");
  isActive$ = sig(false);

  constructor(
    public id: string,
    message: string,
    title: string,
    isActive: boolean
  ) {
    this.title$.set(title);
    this.message$.set(message);
    this.isActive$.set(isActive);
  }

  toggleDisable() {
    this.isActive$.set(!this.isActive$.get());
  }

  setTitle(title: string) {
    this.title$.set(title);
  }

  setMessage(message: string) {
    this.message$.set(message);
  }
}
