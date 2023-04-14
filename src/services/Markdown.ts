import MarkdownIt from "markdown-it";
import Prism from "prismjs";

const getLanguage = (lang: string) => {
  return !lang || lang === "html" ? "markup" : lang;
};

export default class Markdown {
  markdownIt = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    highlight: function (code: string, lang: string) {
      const language = getLanguage(lang);
      const grammar = Prism.languages[language];

      try {
        if (!grammar) require(`prismjs/components/prism-${language}.min.js`);
        if (grammar) return Prism.highlight(code, grammar, language);
      } catch (err) {
        console.error(err);
      }

      return "";
    },
  });

  render(markdown: string) {
    return this.markdownIt.render(markdown);
  }
}
