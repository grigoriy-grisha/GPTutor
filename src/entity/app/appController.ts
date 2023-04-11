import { Subject } from "../../utils";

class AppController {
  showWaitBanner$: Subject<boolean> = new Subject(true);

  closeWaitBanner = () => {
    this.showWaitBanner$.next(false);
  };
}

export const appController = new AppController();
