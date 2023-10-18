import React from "react";
import {
  Div,
  Panel,
  PanelHeaderBack,
  PanelHeaderSubmit,
  Separator,
  Spacing,
  Title,
} from "@vkontakte/vkui";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";
import { AppContainer } from "$/components/AppContainer";
import { imageGeneration } from "$/entity/image";
import { PromptTrack } from "$/panels/ImageCreatePrompts/PromptTrack";
import {
  randomPromptsCameraSettings,
  randomPromptsLighting,
  randomPromptsModifiersQuality,
  randomPromptsModifiersStyles,
  randomPromptsOne,
  randomPromptsStyles,
  randomPromptsTwo,
} from "$/entity/image/prompts";

interface ImageCreatePromptsProps {
  id: string;
}

function ImageCreatePrompts({ id }: ImageCreatePromptsProps) {
  const { goBack } = useNavigationContext();

  const imageGenerationPrompt = imageGeneration.imageGenerationPrompt;

  function submitPrompts() {
    imageGeneration.setPrompt(imageGenerationPrompt.getPrompt());
    goBack();
  }

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <AppPanelHeader
            before={<PanelHeaderBack onClick={submitPrompts} />}
            after={<PanelHeaderSubmit onClick={submitPrompts} />}
          >
            <div />
          </AppPanelHeader>
        }
      >
        <div style={{ maxWidth: "100vw" }}>
          <Div>
            <Title>Используйте выразительные образы ✨</Title>
          </Div>
          <PromptTrack prompts={randomPromptsOne} type="prompt" />
          <PromptTrack prompts={randomPromptsTwo} type="prompt" />
          <Spacing size={4} />
          <Separator />
          <Div>
            <Title level="2">
              Дописывайте модификаторы стилей, для ярких образов 🔥
            </Title>
          </Div>
          <PromptTrack
            title="Настроение"
            prompts={randomPromptsModifiersStyles}
            type="style"
          />
          <PromptTrack
            title="Качество"
            prompts={randomPromptsModifiersQuality}
            type="style"
          />
          <PromptTrack
            title="Настройки камеры"
            prompts={randomPromptsCameraSettings}
            type="style"
          />

          <PromptTrack
            title="Стиль"
            prompts={randomPromptsStyles}
            type="style"
          />
          <PromptTrack
            title="Освещение"
            prompts={randomPromptsLighting}
            type="style"
          />
        </div>
      </AppContainer>
    </Panel>
  );
}

export default ImageCreatePrompts;
