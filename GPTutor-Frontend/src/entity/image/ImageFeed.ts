import {
  GeneratedImage,
  ImageComplaint,
  ImageLikes,
} from "$/entity/image/types";
import { sig } from "dignals";
import { vkUserModel } from "$/entity/user";

export class ImageFeed {
  image$ = sig<GeneratedImage>(null!);
  constructor(image: GeneratedImage) {
    this.image$.set(image);
  }

  updateComplaints(complaint: ImageComplaint) {
    const image = this.image$.get();
    this.image$.set({
      ...image,
      complaints: [...image.complaints, complaint],
    });
  }

  updateLikes(like: ImageLikes) {
    const image = this.image$.get();
    this.image$.set({
      ...image,
      imageLikes: [...image.imageLikes, like],
    });
  }

  isComplaint() {
    return !!this.image$
      .get()
      .complaints.find(
        (complaint) => complaint.vkUser.vkId === String(vkUserModel.model$.id)
      );
  }

  isLike() {
    return !!this.image$
      .get()
      .imageLikes.find(
        (like) => like.vkUser.vkId === String(vkUserModel.model$.id)
      );
  }
}
