import { sig } from "dignals";
import { conversationVKDoc } from "$/api/completions";
import { VkDocsResponse } from "$/entity/GPT/types";
import { SegmentedControlValue } from "@vkontakte/vkui";

class VkDocClient {
  sources = [
    {
      label: "Все",
      value: "all",
    },
    {
      label: "VK Api",
      value: "vk_api_docs",
    },
    {
      label: "VK UI",
      value: "vk_ui",
    },
    {
      label: "Youtube",
      value: "youtube_course",
    },
  ];

  loading$ = sig(false);
  searchValue$ = sig("");
  result$ = sig<VkDocsResponse | null>(null);
  selectedSource$ = sig("all");

  async getResult() {
    this.result$.set(null);
    if (this.searchValue$.get() == "") {
      return;
    }

    this.loading$.set(true);
    const result = await conversationVKDoc({
      question: this.searchValue$.get(),
      source: this.selectedSource$.get(),
    });

    this.result$.set({ ...result, question: this.searchValue$.get() });
    this.loading$.set(false);
    this.searchValue$.set("");
  }

  setSource = (value: string) => {
    this.selectedSource$.set(value);
  };
}

export const vkDocClient = new VkDocClient();
