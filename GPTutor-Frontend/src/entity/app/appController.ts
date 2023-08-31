import { sig } from "dignals";

class AppController {
  showWaitBanner$ = sig<boolean>(true);

  closeWaitBanner = () => {
    this.showWaitBanner$.set(false);
  };
}

export const appController = new AppController();
