import bridge, { AnyRequestMethodName } from "@vkontakte/vk-bridge";
import { log } from "@craco/craco/dist/lib/logger";

export class TranslationService {
  attempts = 10;

  runCleanAttempts() {
    setTimeout(() => {
      this.attempts = 10;
    }, 60000);
  }

  async translate(text: string) {
    console.log(this.attempts);
    if (this.isEnglishOver50Percent(text)) return text;
    if (this.attempts === 0) return text;
    this.attempts--;
    if (this.attempts === 0) {
      this.runCleanAttempts();
    }

    const result = (await bridge.send(
      <AnyRequestMethodName>"VKWebAppTranslate",
      {
        texts: [text],
        translation_language: "ru-en",
      } as any
    )) as any;

    console.log(result, "result");
    return result.result.texts[0];
  }

  isEnglishOver50Percent(text: string) {
    let englishCount = 0;
    let totalCount = 0;

    for (let index = 0; index < text.length; index++) {
      if (/[a-zA-Z]/.test(text[index])) {
        englishCount++;
      }
      totalCount++;
    }

    const englishPercentage = (englishCount / totalCount) * 100;

    return englishPercentage > 50;
  }
}
export const translationService = new TranslationService();
