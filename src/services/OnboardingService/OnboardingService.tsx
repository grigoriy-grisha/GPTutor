import bridge, { AnyRequestMethodName } from "@vkontakte/vk-bridge";
import {
  firstSlide,
  fourthSlide,
  secondSlide,
  thirdSlide,
} from "$/services/OnboardingService/slides";

export class OnboardingService {
  async runOnBoarding() {
    console.log("run");
    await bridge
      .send(
        "VKWebAppShowSlidesSheet" as AnyRequestMethodName,
        {
          slides: [
            {
              media: { blob: firstSlide, type: "image" },
              title: "Добро пожаловать!",
              subtitle:
                "Общайтесь с ботом на любые темы, музыка, программирование, литература",
            },
            {
              media: { blob: secondSlide, type: "image" },
              title: "Переводите текст, изучайте языки!",
              subtitle:
                "Бот знает более 10 естественных языков! Русский, Английский, Испанский и множество других!",
            },
            {
              media: { blob: thirdSlide, type: "image" },
              title: "Обучайтесь программированию!",
              subtitle:
                "Бот знает все популярные языки программирования и с удовольствием поделится знаниями в области разработки!",
            },
            {
              media: { blob: fourthSlide, type: "image" },
              title: "Удачи в освоении новых навыков!",
              subtitle: "Постигайте новое с GPTutor!",
            },
          ],
        } as any
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
