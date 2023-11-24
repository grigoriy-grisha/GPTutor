import ReactivePromise from "$/services/ReactivePromise";
import { memo, sig } from "dignals";
import { chatGpt } from "$/entity/GPT";
import { getImages } from "$/api/images";
import { ImageHistoryItem } from "$/entity/image/ImageHistoryItem";

export class ImageHistory {
  getImages$ = ReactivePromise.create(getImages);

  images = sig<ImageHistoryItem[]>([]);

  pageNumber = 0;

  hasNextHistory$ = memo(() => {
    const result = this.getImages$.result.get();
    if (result === undefined) return true;
    return !result.last;
  });

  async loadHistory() {
    this.pageNumber = 0;
    const images = await this.getImages$.run(this.pageNumber);
    this.images.set(images.content.map((image) => new ImageHistoryItem(image)));
  }

  async nextLoadHistory() {
    if (!chatGpt.history.hasNextHistory$.get()) return;

    this.pageNumber++;
    const history = await this.getImages$.run(this.pageNumber);

    this.images.set([
      ...this.images.get(),
      ...history.content.map((image) => new ImageHistoryItem(image)),
    ]);
  }
}

export const imageHistory = new ImageHistory();
