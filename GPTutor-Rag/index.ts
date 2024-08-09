import express from "express";

import { GigaChatEmbeddings } from "./GigaChatSupport/GigaChatEmbeddings";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import * as bodyParser from "body-parser";
import { createWorkflow } from "./graph/buildWorkflow";
import { EnsembleRetriever } from "langchain/retrievers/ensemble";
import dotenv from "dotenv";
dotenv.config();
import "web-streams-polyfill/es6";

const app = express();

console.log(process.env.CLIENT_SECRET_KEY);
app.use(bodyParser.json());

(async () => {
  const vectorStoreVKUIDoc = await FaissStore.loadFromPython(
    "./faiss_vk_ui_docs_index",
    new GigaChatEmbeddings({ clientSecretKey: process.env.CLIENT_SECRET_KEY })
  );

  const vectorStoreVKDoc = await FaissStore.loadFromPython(
    "./faiss_vk_docs_index",
    new GigaChatEmbeddings({ clientSecretKey: process.env.CLIENT_SECRET_KEY })
  );

  const vectorStoreVideos = await FaissStore.loadFromPython(
    "./faiss_vk_videos_index",
    new GigaChatEmbeddings({ clientSecretKey: process.env.CLIENT_SECRET_KEY })
  );

  function createRetriever(source: string) {
    if (source === "all") {
      return new EnsembleRetriever({
        retrievers: [
          vectorStoreVKUIDoc.asRetriever({ k: 3 }),
          vectorStoreVKDoc.asRetriever({ k: 3 }),
          vectorStoreVideos.asRetriever({ k: 3 }),
        ],
        weights: [0.33, 0.33, 0.33],
      });
    }

    if (source == "vk_api_docs") {
      return vectorStoreVKDoc.asRetriever({ k: 6 });
    }

    if (source == "vk_ui") {
      return vectorStoreVKUIDoc.asRetriever({ k: 6 });
    }

    return vectorStoreVideos.asRetriever({ k: 6 });
  }

  app.post("/doc-question", async (req, res) => {
    console.log(req.body);
    const { question, source } = req.body;
    res.send(await createWorkflow(question, createRetriever(source)));
  });

  app.listen(5000, () => {
    console.log(`Server running on port ${5000}`);
  });
})();
