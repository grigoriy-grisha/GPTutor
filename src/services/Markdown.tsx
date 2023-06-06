import MarkdownIt from "markdown-it";
import Prism from "prismjs";
import { RenderRule } from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
import ReactDOM from "react-dom/server";
import React from "react";

import { Copy } from "../components/Copy";

// @ts-ignore
import mila from "markdown-it-link-attributes";

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

function renderCode(origRule?: RenderRule): RenderRule {
  return (tokens: Token[], idx: number, ...props) => {
    if (!origRule) return "";

    return `
      <div style="position: relative" data-pre-container>
        ${origRule(tokens, idx, ...props)}
        ${copyMockButton}
      </div>
    `;
  };
}

export default class Markdown {
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
  })
    .use((plugin) => {
      plugin.renderer.rules.code_block = renderCode(
        plugin.renderer.rules.code_block
      );
      plugin.renderer.rules.fence = renderCode(plugin.renderer.rules.fence);
    })
    .use(mila, { attrs: { target: "_blank" } });

  render(markdown: string) {
    return this.markdownIt.render(markdown);
  }
}
