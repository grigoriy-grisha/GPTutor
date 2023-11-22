import bridge from "@vkontakte/vk-bridge";
import * as slidesGPTutor from "./slidesGPTutor";
import * as slidesStableArt from "./slidesStableArt";
import { appService } from "$/services/AppService";

export class OnboardingService {
  gptutorOnBoarding() {
    bridge
      .send("VKWebAppShowSlidesSheet" as any, {
        slides: [
          {
            media: { blob: slidesGPTutor.firstSlide, type: "image" },
            title: "Добро пожаловать!",
            subtitle:
              "Общайтесь с ботом на любые темы: музыка, программирование, искусство.",
          },
          {
            media: { blob: slidesGPTutor.secondSlide, type: "image" },
            title: "Переводите текст, изучайте языки!",
            subtitle: "Бот знает более 10 естественных языков!",
          },
          {
            media: { blob: slidesGPTutor.thirdSlide, type: "image" },
            title: "Обучайтесь программированию!",
            subtitle:
              "Бот знает все популярные языки программирования и с удовольствием поделится знаниями!",
          },
          {
            media: { blob: slidesGPTutor.fourthSlide, type: "image" },
            title: "Удачи в освоении новых навыков!",
            subtitle: "Обучайтесь чему угодно с GPTutor!",
          },
        ],
      })
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  }

  stableArtOnBoarding() {
    bridge
      .send("VKWebAppShowSlidesSheet" as any, {
        slides: [
          {
            media: { blob: slidesStableArt.firstSlide, type: "image" },
            title: "Добро пожаловать!",
            subtitle:
              "Генерируйте любые изображения с помощью технологии Stable Diffusion!",
          },
          {
            media: { blob: slidesStableArt.secondSlide, type: "image" },
            title: "Генерируйте совершенно любые обазы!",
            subtitle:
              "С помощью редактора с искусственным интеллектом, который предложит яркие образы!",
          },
          {
            media: { blob: slidesStableArt.thirdSlide, type: "image" },
            title: "Улучшайте результаты!",
            subtitle:
              "С помощью расширенных настроек Stable Diffusion получайте идеальные изображения!",
          },
        ],
      })
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  }

  async runOnBoarding() {
    if (appService.isGPTutor()) {
      this.gptutorOnBoarding();
    } else {
      this.stableArtOnBoarding();
    }
  }
}
