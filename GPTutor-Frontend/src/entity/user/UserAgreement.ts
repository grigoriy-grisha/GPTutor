import { sig } from "dignals";
import { getImageAgreement, setImageAgreement } from "$/api/user";

class UserAgreement {
  isHasImageAgreement = sig(false);
  viewUserAgreement = sig(true);

  toggleViewUserAgreement = () => {
    this.viewUserAgreement.set(!this.viewUserAgreement.get());
  };

  async getUserImageAgreement() {
    const imageAgreement = await getImageAgreement();

    if (imageAgreement === true) {
      this.isHasImageAgreement.set(true);
    }
  }

  async setUserImageAgreement() {
    const imageAgreement = await setImageAgreement();

    if (imageAgreement === true) {
      this.isHasImageAgreement.set(true);
    }
  }
}

export const userAgreement = new UserAgreement();
