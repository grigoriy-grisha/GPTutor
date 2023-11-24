import { GeneratedImage } from "$/entity/image/types";
import { sig } from "dignals";

export class ImageHistoryItem {
  constructor(public item: GeneratedImage) {}

  loading$ = sig(false);
}
