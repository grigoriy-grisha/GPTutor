import { sig } from "dignals";
import { conversationVKDoc } from "$/api/completions";
import { VkDocsResponse } from "$/entity/GPT/types";

class VkDocClient {
  loading$ = sig(false);
  searchValue$ = sig("");
  result$ = sig<VkDocsResponse | null>(null);

  async getResult() {
    this.result$.set(null);
    if (this.searchValue$.get() == "") {
      return;
    }

    this.loading$.set(true);
    const result = await conversationVKDoc(this.searchValue$.get());

    this.result$.set(result);
    this.loading$.set(false);
    this.searchValue$.set("");
  }
}

export const vkDocClient = new VkDocClient();
