import { sig } from "dignals";
import { getBalance, getImageAgreement, setImageAgreement } from "$/api/user";
import { purchaseService } from "$/services/PurchaseService";

class UserInfo {
  balance = sig(0);

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

  async getUserBalance() {
    const balance = await getBalance();
    this.balance.set(balance.tokens_gpt);
  }

  async buyBalance(energy: number) {
    const status = await purchaseService.showOrderBox(`energy_${energy}`);

    if (status) {
      this.balance.set(this.balance.get() + energy);
    }
  }

  subtractBalance(energy: number) {
    this.balance.set(this.balance.get() - energy);
  }

  isAvailableBalance() {
    return this.balance.get() > 0;
  }
}

export const userInfo = new UserInfo();
