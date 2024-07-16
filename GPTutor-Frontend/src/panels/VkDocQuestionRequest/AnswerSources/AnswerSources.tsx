import { DocumentVKDoc } from "$/entity/GPT";
import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import faviconFetch from "favicon-fetch";
import { Caption, Spacing, Tappable, Title } from "@vkontakte/vkui";

import classes from "./AnswerSources.module.css";

interface IAnswerSourceProps {
  document: DocumentVKDoc;
}

function AnswerSource({ document }: IAnswerSourceProps) {
  console.log(document);
  const link = document.metadata.link;
  const time = document.metadata.time;

  if (link && time !== undefined) {
    const videoLink = `${link}?t=${time}`;

    return (
      <div>
        <Tappable
          className={classes.link}
          href={`${link}?t=${time}`}
          target="_blank"
        >
          <img
            width={16}
            height={18}
            src={faviconFetch({ uri: link, fallbackText: "G" })}
            alt=""
          />
          <div>
            <span className={classes.url}>{videoLink}</span>
            <Spacing size={6} />
            <iframe
              className={classes.iframe}
              width="70%"
              src={videoLink}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Tappable>

        <Spacing size={14} />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.link}>
        <img
          width={16}
          height={16}
          src={faviconFetch({
            uri: document.metadata.source,
            fallbackText: "G",
          })}
          alt=""
        />
        <div>
          <Tappable
            className={classes.url}
            href={document.metadata.source}
            target="_blank"
          >
            <Title level="3" className={classes.title}>
              {document.metadata.title || "VK Docs"}
            </Title>
            <Spacing size={6} />
            {new URL(document.metadata.source!).host}
          </Tappable>

          <Spacing size={4} />
          <Caption>{document.metadata.description}</Caption>
          <Spacing size={14} />
        </div>
      </div>
    </div>
  );
}

interface IAnswerSourcesProps {
  documents: DocumentVKDoc[];
}

function removeDuplicates(array: any[]) {
  const seen = new Set();
  return array.filter((item) => {
    const key = `${item.metadata.link}-${item.metadata.source}`;
    if (seen.has(key)) {
      return false;
    } else {
      seen.add(key);
      return true;
    }
  });
}

function AnswerSources({ documents }: IAnswerSourcesProps) {
  return (
    <div>
      {removeDuplicates(documents).map((document, index) => (
        <AnswerSource key={index} document={document} />
      ))}
    </div>
  );
}

export default AnswerSources;
