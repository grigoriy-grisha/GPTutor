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
import { Icon28EditOutline } from "@vkontakte/icons";

const getLanguage = (lang: string) => {
  return !lang || lang === "html" ? "markup" : lang;
};

const copyMockButton = ReactDOM.renderToString(
  <div data-copy-mock="">
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
    before={<Icon28EditOutline width={24} height={24} />}
    mode="secondary"
  >
    Песочница
  </Button>
);

const isEditableLanguages = ["language-javascript", "language-python"];

function renderCode(origRule?: RenderRule): RenderRule {
  return (tokens: Token[], idx: number, ...props) => {
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
                ? ` <div class="${foundLanguage}" data-edit-mock="">
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
