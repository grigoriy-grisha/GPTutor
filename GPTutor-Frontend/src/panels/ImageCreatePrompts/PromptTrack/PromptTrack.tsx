import React from "react";

import {
  Button,
  HorizontalCell,
  HorizontalScroll,
  Spacing,
  Text,
  Title,
} from "@vkontakte/vkui";
import { Icon24AddOutline, Icon24DoneOutline } from "@vkontakte/icons";

import { imageGeneration } from "$/entity/image";
import { AppDiv } from "$/components/AppDiv";

import classes from "./PromptTrack.module.css";

interface PromptTrackProps {
  title?: string;
  prompts: string[];
  type: "prompt" | "style";
}

function PromptTrack({ prompts, type, title }: PromptTrackProps) {
  const imageGenerationPrompt = imageGeneration.imageGenerationPrompt;

  function isSelect(prompt: string) {
    if (type === "prompt") {
      return imageGenerationPrompt.isSelectedPrompt(prompt);
    }

    return imageGenerationPrompt.isSelectedStyle(prompt);
  }

  function selectPrompt(prompt: string) {
    if (type === "prompt") {
      return imageGenerationPrompt.$selectPrompt(prompt);
    }

    return imageGenerationPrompt.$selectStyles(prompt);
  }

  return (
    <>
      {title && (
        <AppDiv>
          <Text weight="1" className={classes.title}>
            {title}
          </Text>
        </AppDiv>
      )}
      <Spacing size={4} />
      <HorizontalScroll className={classes.horizontalScroll}>
        <div style={{ display: "flex" }}>
          {prompts.map((prompt) => {
            return (
              <HorizontalCell
                size="l"
                key={prompt}
                onClick={() => selectPrompt(prompt)}
              >
                <Button
                  mode={isSelect(prompt) ? "primary" : "outline"}
                  size="m"
                  after={
                    isSelect(prompt) ? (
                      <Icon24DoneOutline width={20} height={20} />
                    ) : (
                      <Icon24AddOutline width={20} height={20} />
                    )
                  }
                >
                  {prompt}
                </Button>
              </HorizontalCell>
            );
          })}
        </div>
      </HorizontalScroll>
    </>
  );
}

export default PromptTrack;
