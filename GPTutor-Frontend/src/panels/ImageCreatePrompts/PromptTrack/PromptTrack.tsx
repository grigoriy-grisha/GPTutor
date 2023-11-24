import React from "react";

import {
  Button,
  HorizontalCell,
  HorizontalScroll,
  IconButton,
  Spacing,
  Text,
  Title,
} from "@vkontakte/vkui";
import {
  Icon24AddOutline,
  Icon24DoneOutline,
  Icon20Clear,
} from "@vkontakte/icons";

import { imageGeneration } from "$/entity/image";
import { AppDiv } from "$/components/AppDiv";

import classes from "./PromptTrack.module.css";
import { SelectButton } from "$/components/SelectButton";

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
        <AppDiv style={{ display: "flex", alignItems: "center" }}>
          <Text weight="1" className={classes.title}>
            {title}
          </Text>
          {type === "style" && (
            <IconButton
              style={{
                marginLeft: 8,
                color: "var(--vkui--color_text_accent_themed)",
              }}
              disabled={!imageGenerationPrompt.isHasSelected(prompts)}
              onClick={() => imageGenerationPrompt.$removeStyles(prompts)}
            >
              <Icon20Clear />
            </IconButton>
          )}
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
                <SelectButton selected={isSelect(prompt)}>
                  {prompt}
                </SelectButton>
              </HorizontalCell>
            );
          })}
        </div>
      </HorizontalScroll>
    </>
  );
}

export default PromptTrack;
