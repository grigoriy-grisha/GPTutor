import { Subject } from "../../utils";

class AppController {
  constructor() {
    this.showWaitBanner$ = new Subject(true);
  }

  closeWaitBanner = () => {
    this.showWaitBanner$.next(false);
  };
}

export const appController = new AppController();
