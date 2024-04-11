/* eslint-disable */

import MarkdownIt from "markdown-it";
import Prism from "prismjs";
import { RenderRule } from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
import ReactDOM from "react-dom/server";
import React from "react";

import { Copy } from "../components/Copy";

// @ts-ignore
import mila from "markdown-it-link-attributes";
import { Button } from "@vkontakte/vkui";
import {
  Icon20SquareStackUpOutline,
  Icon24StatisticsOutline,
  Icon28BracketsSlashSquareOutline,
} from "@vkontakte/icons";

require(`prismjs/components/prism-go.min.js`);
require(`prismjs/components/prism-python.min.js`);

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
    size="m"
    before={<Icon28BracketsSlashSquareOutline width={22} height={22} />}
    mode="secondary"
  >
    Песочница
  </Button>
);

const mermaidMockButton = ReactDOM.renderToString(
  <Button
    size="m"
    mode="secondary"
    before={<Icon20SquareStackUpOutline width={22} height={22} />}
  >
    Визуализировать
  </Button>
);

const isEditableLanguages = [
  "language-javascript",
  "language-python",
  "language-go",
];

const mermaidLang = ["language-mermaid"];

function renderCode(origRule?: RenderRule): RenderRule {
  return (tokens: Token[], idx: number, ...props) => {
    if (!origRule) return "";

    const code = origRule(tokens, idx, ...props);

    const foundLanguage = isEditableLanguages.find((lang) =>
      code.includes(lang)
    );

    const mermaidLanguage = mermaidLang.find((lang) => code.includes(lang));

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
            ${
              mermaidLanguage
                ? ` <div class="${mermaidLanguage}" data-mermaid="" data-mock-button="">
                      ${mermaidMockButton}
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
        if (!grammar) {
          const gen = (function* () {
            yield import(
              `prismjs/components/prism-${language || "text"}.min.js`
            );

            const grammar = Prism.languages[language];
            console.log(grammar);

            yield Prism.highlight(code, grammar, language);
          })();

          gen.next();
          gen.next();
          gen.next();

          const a = gen.next().value;
          return a as any;
        }

        if (grammar) return Prism.highlight(code, grammar, language);
      } catch (err) {
        console.error(err);
      }

      return "";
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
        if (!grammar)
          require(`prismjs/components/prism-${language || "text"}.min.js`);
        if (grammar) return Prism.highlight(code, grammar, language);
      } catch (err) {
        console.error(err);
      }

      return "";
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
        if (!grammar)
          require(`prismjs/components/prism-${language || "text"}.min.js`);
        if (grammar) return Prism.highlight(code, grammar, language);
      } catch (err) {
        console.error(err);
      }

      return "";
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
