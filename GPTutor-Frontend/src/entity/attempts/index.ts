import { getAttempts } from "$/api/attempts";
import { sig } from "dignals";
import { VkStorageService } from "$/services/VkStorageService";

class Attempts {
  $requests = sig(10);
  $attemptsToFree = sig(10);

  storage = new VkStorageService();

  async getAttempts() {
    const result = await getAttempts();
    this.$requests.set(result.requests);
    this.$attemptsToFree.set(result.freeAttempts);

    return result.requests;
  }
}

export const attempts = new Attempts();
