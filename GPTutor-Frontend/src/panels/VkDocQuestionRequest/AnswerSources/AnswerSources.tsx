import { DocumentVKDoc } from "$/entity/GPT";
import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  Accordion,
  Caption,
  Div,
  Separator,
  Spacing,
  Tappable,
  Title,
} from "@vkontakte/vkui";

import classes from "./AnswerSources.module.css";
import { faviconFetch } from "$/utility/faviconFetch";
import { AppDiv } from "$/components/AppDiv";

interface IAnswerSourceProps {
  document: DocumentVKDoc;
}

function AnswerSource({ document }: IAnswerSourceProps) {
  const link = document.metadata?.link;
  const time = document.metadata.time;

  if (link && time !== undefined) {
    const videoLink = `${link}?t=${time}`;

    return (
      <div style={{ width: "100%" }}>
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
          <div style={{ width: "100%" }}>
            <span className={classes.url}>{videoLink}</span>
            <Spacing size={6} />
            <iframe
              className={classes.iframe}
              width="30%"
              src={videoLink}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Tappable>
        <AppDiv>
          <Accordion>
            <Accordion.Summary>Найденный конент в источнике:</Accordion.Summary>
            <Accordion.Content>
              <Div style={{ color: "var(--vkui--color_text_subhead)" }}>
                {document.pageContent}
              </Div>
            </Accordion.Content>
          </Accordion>
        </AppDiv>

        <Spacing size={8} />
        <Separator />
        <Spacing size={14} />
      </div>
    );
  }

  const url = document.metadata.url || document.metadata.source;
  return (
    <div>
      <div className={classes.link}>
        <img
          width={16}
          height={16}
          src={faviconFetch({
            uri: url,
            fallbackText: "G",
          })}
          alt=""
        />
        <div style={{ width: "100%" }}>
          <Tappable className={classes.url} href={url} target="_blank">
            <Title level="3" className={classes.title}>
              {document.metadata.pageTitle || "VKUI"}
            </Title>
            <Spacing size={6} />
            {new URL(url!).host}
          </Tappable>

          <Spacing size={4} />
          <Caption>{document.metadata.description}</Caption>
        </div>
      </div>
      <Spacing size={4} />
      <AppDiv>
        <Accordion>
          <Accordion.Summary>Найденный конент в источнике:</Accordion.Summary>
          <Accordion.Content>
            <Div style={{ color: "var(--vkui--color_text_subhead)" }}>
              {document.pageContent}
            </Div>
          </Accordion.Content>
        </Accordion>
      </AppDiv>

      <Spacing size={8} />
      <Separator />
      <Spacing size={14} />
    </div>
  );
}

interface IAnswerSourcesProps {
  documents: DocumentVKDoc[];
}

function AnswerSources({ documents }: IAnswerSourcesProps) {
  return (
    <div>
      {documents.map((document, index) => (
        <AnswerSource key={index} document={document} />
      ))}
    </div>
  );
}

export default AnswerSources;
