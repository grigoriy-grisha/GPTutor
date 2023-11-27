import { memo, sig } from "dignals";
import { GeneratedImage } from "$/entity/image/types";
import { chatGpt } from "$/entity/GPT";
import ReactivePromise from "$/services/ReactivePromise";
import {
  createComplaint,
  createImageLike,
  getImagesPublishing,
} from "$/api/images";
import { images } from "$/entity/image/imageCreations";
import { vkUserModel } from "$/entity/user";
import { ImageFeed } from "$/entity/image/ImageFeed";

class ImagesFeed {
  loading$ = sig(false);

  getImages$ = ReactivePromise.create(getImagesPublishing);

  currentImage$ = sig<ImageFeed | null>(null);

  searchValue$ = sig("");

  images = sig<ImageFeed[]>([]);

  pageNumber = 0;

  hasNextHistory$ = memo(() => {
    const result = this.getImages$.result.get();
    if (result === undefined) return true;
    return !result.last;
  });

  async loadHistory() {
    this.loading$.set(true);
    this.pageNumber = 0;
    const images = await this.getImages$.run(
      this.searchValue$.get(),
      this.searchValue$.get(),
      this.pageNumber
    );

    console.log(images.content.length);
    console.log(
      this.filterByReports(images.content.map((image) => new ImageFeed(image)))
    );
    this.images.set(
      this.filterByReports(images.content.map((image) => new ImageFeed(image)))
    );
    this.loading$.set(false);
  }

  async nextLoadHistory() {
    if (!chatGpt.history.hasNextHistory$.get()) return;

    this.pageNumber++;
    const history = await this.getImages$.run(
      this.searchValue$.get(),
      this.searchValue$.get(),
      this.pageNumber
    );

    this.images.set(
      this.images
        .get()
        .concat(
          this.filterByReports(
            history.content.map((image) => new ImageFeed(image))
          )
        )
    );
  }

  setCurrentImage(image: ImageFeed) {
    this.currentImage$.set(image);
  }

  async onSearch() {
    this.loading$.set(true);
    this.pageNumber = 0;

    const history = await this.getImages$.run(
      this.searchValue$.get(),
      this.searchValue$.get(),
      this.pageNumber
    );

    this.images.set(
      this.filterByReports(history.content.map((image) => new ImageFeed(image)))
    );
    this.loading$.set(false);
  }

  async createComplaint(imageId: string) {
    const complaint = await createComplaint(imageId);

    const foundImage = this.images
      .get()
      .find((image) => image.image$.get().id === imageId);

    if (!foundImage) return;

    foundImage.updateComplaints(complaint);
  }

  async createImageLike(imageId: string) {
    const like = await createImageLike(imageId);

    const foundImage = this.images
      .get()
      .find((image) => image.image$.get().id === imageId);

    if (!foundImage) return;

    foundImage.updateLikes(like);
  }

  filterByReports(images: ImageFeed[]) {
    return images.filter((imageFeed) => {
      return !imageFeed.isComplaint();
    });
  }
}

export const imagesFeed = new ImagesFeed();
