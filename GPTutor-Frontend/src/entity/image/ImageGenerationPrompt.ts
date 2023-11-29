import { sig } from "dignals";
import { imageGeneration } from "$/entity/image/index";

export class ImageGenerationPrompt {
  selectedPrompt$ = sig("");
  selectedStyles$ = sig<string[]>([]);

  $selectPrompt(prompt: string) {
    if (this.selectedPrompt$.get() === prompt) {
      this.selectedPrompt$.set("");
      return;
    }
    this.selectedPrompt$.set(prompt);
  }

  $selectStyles(style: string) {
    if (this.isSelectedStyle(style)) {
      this.selectedStyles$.set(
        this.selectedStyles$.get().filter((item) => item !== style)
      );

      imageGeneration.disableEnhance();
      return;
    }

    this.selectedStyles$.set([style, ...this.selectedStyles$.get()]);

    imageGeneration.disableEnhance();
  }

  $removeStyles(styles: string[]) {
    const selectedStyles = this.selectedStyles$.get();

    styles.forEach((style) => {
      if (selectedStyles.includes(style)) {
        this.$selectStyles(style);
      }
    });
  }

  isHasSelected(styles: string[]) {
    const selectedStyles = this.selectedStyles$.get();

    return !!styles.find((style) => selectedStyles.includes(style));
  }

  isSelectedPrompt(prompt: string) {
    return prompt === this.selectedPrompt$.get();
  }

  isSelectedStyle(style: string) {
    return this.selectedStyles$.get().includes(style);
  }

  getPrompt() {
    return this.selectedPrompt$.get();
  }
}
