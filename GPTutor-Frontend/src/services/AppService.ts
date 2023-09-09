import { sig } from "dignals";

class AppService {
  loading = sig(true);

  toggleLoading() {
    this.loading.set(!this.loading.get());
  }
}

export const appService = new AppService();
