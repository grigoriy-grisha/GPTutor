import { Document } from "langchain/document";
import parse from "node-html-parser";
import { v4 as uuidv4 } from "uuid";
import { vk_links } from "./vk_links";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { GigaChatEmbeddings } from "./GigaChatSupport/GigaChatEmbeddings";

async function loadPage(url: string) {
  /**
   * Loader uses `page.content()`
   * as default evaluate function
   **/

  const html = await fetch(url).then((a) => a.text());

  const pageContents = [
    ...parse(html)
      .querySelector('[data-t="page-content"]')
      ?.querySelectorAll('[data-t="method-section"]')!,
  ];

  function getBanners(pageContent: any) {
    const banners = pageContent?.querySelectorAll(".sc-crEIGF");
    if (!banners) return [];
    return [...banners!];
  }

  function getHeading(pageContent: any) {
    return pageContent?.querySelector('[data-t="article-heading"]');
  }

  function getTable(pageContent: any) {
    return pageContent?.querySelector(".sc-iSATDh");
  }

  function getTableContent(table: any) {
    let text = "";
    const children = [...table.childNodes];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (i % 2 == 0) {
        text += `Параметр: ${child.childNodes[0].textContent}, Тип: ${child.childNodes[1].textContent}`;
        // @ts-ignore

        continue;
      }

      text += ` — ${child.textContent
        .replaceAll("\n", " ")
        .replaceAll("\n\n", " ")}\n`;
    }

    return text;
  }

  function getResult(pageContent: any) {
    let content = "";
    const result = pageContent
      .querySelector(".sc-bbBEzO")
      ?.querySelector(".sc-pTqjN");

    if (!result) {
      return "";
    }

    content += result?.firstChild?.textContent + "\n\n";

    const tr = result?.querySelectorAll("tr");

    const trs = [...tr];

    content += trs
      .map(
        (tr) =>
          `${tr.childNodes[0].textContent}, ${tr.childNodes[1].textContent}, ${
            tr.childNodes[2] ? tr.childNodes[2].textContent : ""
          }`
      )
      .join("\n");

    const json = result.lastChild;

    if (json) {
      content += "\n" + json.textContent;
    }

    return content;
  }

  function getErrorCodes(pageContent: any) {
    let content = "";
    const codes = pageContent.querySelectorAll(".sc-jtdBMk");

    if (!codes.length) {
      return "";
    }

    for (const code of codes) {
      content += `Код: ${code.childNodes[0].textContent} - ${code.childNodes[1].textContent} \n`;
    }

    return content;
  }

  let content = "";

  if (pageContents.length === 0) {
    const pageContent = parse(html).querySelector('[data-t="page-content"]');

    content += pageContent?.textContent;
  }

  const breadCrumbs = parse(html).querySelector('[data-t="breadcrumbs"]');

  const metaDescription = parse(html)
    .querySelector('[name="description"]')
    ?.getAttribute("content");
  const pageTitle = parse(html).querySelector("title")?.textContent;
  const description = breadCrumbs?.nextSibling?.innerText;

  if (pageTitle && description) {
    content += pageTitle + "\n" + description + "\n\n";
  }

  for (const pageContent of pageContents) {
    const banners = getBanners(pageContent);

    if (banners.length) {
      content +=
        banners.map((banner) => banner.textContent).join("\n") + "\n\n";
    }
    const heading = getHeading(pageContent);
    if (heading) {
      // @ts-ignore
      content += `${heading?.textContent}\n`.replaceAll("\n\n", "\n");
    }
    const table = getTable(pageContent);
    if (table) {
      content += getTableContent(table) + "\n\n";
    }
    content += getResult(pageContent) + "\n\n";
    content += getErrorCodes(pageContent) + "\n\n";
  }

  return new Document({
    id: uuidv4(),
    pageContent: content,
    metadata: {
      url,
      pageTitle,
      description: description || metaDescription,
    },
  });
}

// loadPage()
//   .then((s) => {
//     console.log(s);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

(async () => {
  const result = await new GigaChatEmbeddings({
    clientSecretKey:
      "OTEwZmNhMDAtOGQ1Mi00ZWM5LWFjMjgtZGZjMWVjNDdjNmE4OjVmOWY3NTA5LWM5ODctNDQ3ZC05MjFkLTBiZmZjNjhkMGU2MA==",
  }).embedQuery("Promise");

  console.log(result);
  // const docs = [];
  // let index = 1259;
  //
  // const vectorStore = await FaissStore.load(
  //   "./faiss_vk_docs_index_js",
  //   new GigaChatEmbeddings({
  //     clientSecretKey:
  //       "OTEwZmNhMDAtOGQ1Mi00ZWM5LWFjMjgtZGZjMWVjNDdjNmE4OjVmOWY3NTA5LWM5ODctNDQ3ZC05MjFkLTBiZmZjNjhkMGU2MA==",
  //   })
  // );
  //
  // for (const vk_link of vk_links.slice(1259)) {
  //   index++;
  //   console.log(`${index}/${vk_links.length}`);
  //   console.log(vk_link);
  //
  //   const doc = await loadPage(vk_link);
  //
  //   docs.push(doc);
  //
  //   const splitter = new RecursiveCharacterTextSplitter({
  //     chunkSize: 500,
  //     chunkOverlap: 100,
  //   });
  //
  //   const splitedDocs = await splitter.splitDocuments([doc]);
  //
  //   await vectorStore.addDocuments(splitedDocs);
  //   await vectorStore.save("./faiss_vk_docs_index_js");
  // }
})();
