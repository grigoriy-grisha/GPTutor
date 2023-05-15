import bridge from "@vkontakte/vk-bridge";
import { firstSlide, fourthSlide, secondSlide, thirdSlide } from "./slides";

export class OnboardingService {
  async runOnBoarding() {
    bridge
      .send("VKWebAppShowSlidesSheet" as any, {
        slides: [
          {
            media: { blob: firstSlide, type: "image" },
            title: "Добро пожаловата!",
            subtitle:
              "Общайтесь с ботом на любые темы, музыка, программирование, искусство.",
          },
          {
            media: { blob: secondSlide, type: "image" },
            title: "Переводите текст, изучайте языки!",
            subtitle: "Бот знает более 10 естественных языков!",
          },
          {
            media: { blob: thirdSlide, type: "image" },
            title: "Обучайтесь программированию!",
            subtitle:
              "Бот знает все популярные языки программирования и с удовольствием поделится знаниями!",
          },
          {
            media: { blob: fourthSlide, type: "image" },
            title: "Удачи в освоении новых навыков!",
            subtitle: "Обучайтесь чему угодно с GPTutor!",
          },
        ],
      })
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  }
}
