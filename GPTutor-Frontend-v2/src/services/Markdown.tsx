/* eslint-disable */

import MarkdownIt from "markdown-it";
import Prism from "prismjs";
//@ts-ignore
import { RenderRule } from "markdown-it/lib/renderer";
//@ts-ignore
import Token from "markdown-it/lib/token";
import ReactDOM from "react-dom/server";

//@ts-ignore
import mila from "markdown-it-link-attributes";
import { Button } from "@vkontakte/vkui";
import { Icon28BracketsSlashSquareOutline } from "@vkontakte/icons";
import { Copy } from "../components/Copy";

// Импортируем компоненты Prism статически
import 'prismjs/components/prism-go.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-markup.min.js';

const getLanguage = (lang: string) => {
  return !lang || lang === "html" ? "markup" : lang;
};

const copyMockButton = ReactDOM.renderToString(
  <div data-copy-mock="" data-mock-button="">
    <Copy
      copyText="Скопировать код"
      mode="secondary"
      isButton
      textToClickBoard=""
    />
  </div>
);

const editMockButton = ReactDOM.renderToString(
  <Button
    size="s"
    before={<Icon28BracketsSlashSquareOutline width={16} height={16} />}
    mode="secondary"
  >
    Песочница
  </Button>
);

const isEditableLanguages = [
  "language-javascript",
  "language-python",
  "language-go",
  "language-bash",
];

function renderCode(origRule?: RenderRule): RenderRule {
  return (tokens: Token[], idx: number, ...props: any[]) => {
    if (!origRule) return "";

    const code = origRule(tokens, idx, ...props);

    const foundLanguage = isEditableLanguages.find((lang) =>
      code.includes(lang)
    );

    return `
      <div style="position: relative" data-pre-container>
        ${code}
        <div class="code-buttons">
            ${copyMockButton}
            ${
              foundLanguage
                ? ` <div class="${foundLanguage}" data-edit-mock="" data-mock-button="">
                      ${editMockButton}
                    </div>`
                : ""
            }
        </div>
      </div>
    `;
  };
}

export default class Markdown {
  markdownItWithPlugins = new MarkdownIt({
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    highlight: function (code: string, lang: string) {
      const language = getLanguage(lang);
      const grammar = Prism.languages[language];

      try {
        if (grammar) {
          return Prism.highlight(code, grammar, language);
        }
      } catch (err) {
        console.error(err);
      }

      return code;
    },
  })
    .use((plugin) => {
      plugin.renderer.rules.code_block = renderCode(
        plugin.renderer.rules.code_block
      );
      plugin.renderer.rules.fence = renderCode(plugin.renderer.rules.fence);
    })
    .use(mila, { attrs: { target: "_blank" } });

  markdownIt = new MarkdownIt({
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    highlight: function (code: string, lang: string) {
      const language = getLanguage(lang);
      const grammar = Prism.languages[language];

      try {
        if (grammar) {
          return Prism.highlight(code, grammar, language);
        }
      } catch (err) {
        console.error(err);
      }

      return code;
    },
  });

  markdownItHtml = new MarkdownIt({
    breaks: true,
    html: true,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    highlight: function (code: string, lang: string) {
      const language = getLanguage(lang);
      const grammar = Prism.languages[language];

      try {
        if (grammar) {
          return Prism.highlight(code, grammar, language);
        }
      } catch (err) {
        console.error(err);
      }

      return code;
    },
  })
    .use((plugin) => {
      plugin.renderer.rules.code_block = renderCode(
        plugin.renderer.rules.code_block
      );
      plugin.renderer.rules.fence = renderCode(plugin.renderer.rules.fence);
    })
    .use(mila, { attrs: { target: "_blank" } });

  render(markdown: string) {
    return this.markdownItWithPlugins.render(markdown);
  }

  renderWithoutPlugins(markdown: string) {
    return this.markdownIt.render(markdown);
  }

  renderHtml(markdown: string) {
    return this.markdownItHtml.render(markdown);
  }
}
