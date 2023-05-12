import bridge, { AnyRequestMethodName } from "@vkontakte/vk-bridge";
import {
  firstSlide,
  fourthSlide,
  secondSlide,
  thirdSlide,
} from "$/services/OnboardingService/slides";

export class OnboardingService {
  runOnBoarding() {
    bridge
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
                "Бот знает 10 естественных языков! Русский, Английский, Испанский",
            },
            {
              media: { blob: thirdSlide, type: "image" },
              title: "Обучайтесь программированию!",
              subtitle:
                "Бот знает все популярные языки программирования, с удовольствием поделится знаниями!",
            },
            {
              media: { blob: fourthSlide, type: "image" },
              title: "Удачи в освоении новых навыков!",
              subtitle: "Обучайтесь чему угодно с GPTutor!",
            },
          ],
        } as any
      )
      .then(console.log)
      .catch(console.error);
  }
}
