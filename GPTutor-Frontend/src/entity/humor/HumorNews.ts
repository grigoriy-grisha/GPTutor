import { addLike, getHumors, removeLike } from "$/api/humor";
import { memo, sig } from "dignals";
import { chatGpt } from "$/entity/GPT";
import ReactivePromise from "$/services/ReactivePromise";
import { HumorItem } from "$/entity/humor/types";
import { vkUser } from "$/entity/user";

class HumorNews {
  getHumors$ = ReactivePromise.create(getHumors);

  humors$ = sig<HumorItem[]>([]);

  pageNumber = 0;

  hasNextHistory$ = memo(() => {
    const result = this.getHumors$.result.get();
    if (result === undefined) return true;
    return !result.last;
  });

  async loadHistory() {
    this.pageNumber = 0;
    const history = await this.getHumors$.run(this.pageNumber);
    this.humors$.set(history.content);
  }

  async nextLoadHistory() {
    if (!chatGpt.history.hasNextHistory$.get()) return;

    this.pageNumber++;
    const history = await this.getHumors$.run(this.pageNumber);

    this.humors$.set([...this.humors$.get(), ...history.content]);
  }

  isLiked(item: HumorItem) {
    return !!item.humorEntityLikes.find(
      (like) => like.vkUser.vkId === String(vkUser.id)
    );
  }

  async addLike(item: HumorItem) {
    const like = await addLike(item.id);

    this.humors$.set(
      this.humors$
        .get()
        .map((humor) =>
          humor.id === item.id
            ? { ...humor, humorEntityLikes: [...humor.humorEntityLikes, like] }
            : humor
        )
    );
  }

  async removeLike(item: HumorItem) {
    const like = item.humorEntityLikes.find(
      (like) => like.vkUser.vkId === String(vkUser.id)
    );

    if (!like) return;

    await removeLike(like.id);

    this.humors$.set(
      this.humors$.get().map((humor) => {
        const humorEntityLikes = humor.humorEntityLikes.filter(
          (entityLike) => entityLike.id !== like.id
        );

        return humor.id === item.id ? { ...humor, humorEntityLikes } : humor;
      })
    );
  }
}

export const humorNews = new HumorNews();
