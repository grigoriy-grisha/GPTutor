import React from "react";
import {
  Button,
  ContentCard,
  Div,
  Panel,
  PanelHeaderBack,
  Platform,
  Spacing,
  usePlatform,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { useNavigationContext } from "$/NavigationContext";

import classes from "./ImageGenerationExamples.module.css";
import { ImageExample } from "$/entity/image/types";
import { imageGeneration } from "$/entity/image";
import { useGenerateImage } from "$/hooks/useGenerateImage";

interface IProps {
  id: string;
}

const examples: ImageExample[] = [
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/1281c2f4-8f47-44e5-894c-0ce9b4504b45",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "lineart| vibrant| comprehensive cinematic| Carne Griffiths| Conrad Roset",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "lineart| vibrant| comprehensive cinematic| Carne Griffiths| Conrad Roset",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/a668d790-6aa3-48f6-adca-f024d82c870f",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "an astronaut riding a horse on mars artstation, hd, dramatic lighting, detailed",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "an astronaut riding a horse on mars artstation, hd, dramatic lighting, detailed",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/6fced89a-118f-42f3-b60f-a00d79a72a5e",
    seed: "-1",
    numInferenceSteps: 25,
    prompt: "analog style portrait of a cute young woman with blonde hair",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "analog-diffusion-1.0.ckpt [9ca13f02]",
    negativePrompt: "",
    originalPrompt:
      "analog style portrait of a cute young woman with blonde hair",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/d74a8846-87c0-4582-897d-e4ddac1fcb05",
    seed: "-1",
    numInferenceSteps: 25,
    prompt: "analog style Santa as a 1960s",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "analog-diffusion-1.0.ckpt [9ca13f02]",
    negativePrompt: "",
    originalPrompt: "analog style Santa as a 1960s",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/8f6124b2-80f5-470f-9327-917272349eeb",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "1girl, brown hair, green eyes, colorful, autumn, cumulonimbus clouds",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "anything-v4.5-pruned.ckpt [65745d25]",
    negativePrompt: "",
    originalPrompt:
      "1girl, brown hair, green eyes, colorful, autumn, cumulonimbus clouds",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/c11972ef-ec94-47fa-a0df-04ca5d7502f5",
    seed: "-1",
    numInferenceSteps: 25,
    prompt: "70s progressive rock artwork, funky, vibrant, acid-culture",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "70s progressive rock artwork, funky, vibrant, acid-culture",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/fdbfaec8-b817-4b70-8413-cca5525a8182",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "portrait of superman, style of (van gogh), short hair, highly detailed, beautiful art,",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "((beard:1.4,)) red hair, frame, canvas frame",
    originalPrompt:
      "portrait of superman, style of (van gogh), short hair, highly detailed, beautiful art,",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/ab983418-8f55-4542-8195-559a1ddff09f",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "vintage blonde pin-up girl, style of (picasso), very abstract, surrealism, cubism",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "nsfw:1.3",
    originalPrompt:
      "vintage blonde pin-up girl, style of (picasso), very abstract, surrealism, cubism",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/3e449318-5c73-4ab6-b201-e335ccb6392f",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "style of (Albert Bierstadt), beautiful valley with mountains on each side, morning yellow sun, vast and luminous, luminism, realism, romanticism, insane detail, highly detailed, warm colors, warm lighting",
    guidanceScale: 7,
    scheduler: "DDPMScheduler",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "style of (Albert Bierstadt), beautiful valley with mountains on each side, morning yellow sun, vast and luminous, luminism, realism, romanticism, insane detail, highly detailed, warm colors, warm lighting",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/bf109934-d282-4136-a8fe-800c81ddb935",
    seed: "-1",
    numInferenceSteps: 25,
    prompt: "style of (Tim Burton), woman ",
    guidanceScale: 7,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt: "style of (Tim Burton), woman ",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/c1219d6c-549a-4c8b-972e-7af7affe8856",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "tiny isometric scientific lab, little scientist, smooth lighting, 100mm lens",
    guidanceScale: 10,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "tiny isometric scientific lab, little scientist, smooth lighting, 100mm lens",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/a2c85b4a-f540-4c83-993c-13f6262b0b13",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "kawaii low poly beluga whale, 3d isometric render, blue background, unity engine, ambient occlusion",
    guidanceScale: 10,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "kawaii low poly beluga whale, 3d isometric render, blue background, unity engine, ambient occlusion",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/9c8d831d-fbbd-4fc2-ba0c-1d887c1d9272",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "Retro comic style artwork, highly detailed michael j fox, comic book cover, symmetrical, vintage",
    guidanceScale: 10,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "Retro comic style artwork, highly detailed michael j fox, comic book cover, symmetrical, vintage",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/fc7d0108-abd1-4763-8150-cbdf0873ce76",
    seed: "-1",
    numInferenceSteps: 25,
    prompt: "Man outside saloon, wild west",
    guidanceScale: 10,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt: "Man outside saloon, wild west",
  },
  {
    loraModel: "",
    url: "https://storage.yandexcloud.net/gptutor-bucket/eea52f4b-655f-4460-99b8-a05373432561",
    seed: "-1",
    numInferenceSteps: 25,
    prompt:
      "extreme close-up of old man outdoors, telephoto, ambient lighting, monochrome",
    guidanceScale: 10,
    scheduler: "DPM++ SDE Karras",
    modelId: "v1-5-pruned-emaonly.safetensors [d7049739]",
    negativePrompt: "",
    originalPrompt:
      "extreme close-up of old man outdoors, telephoto, ambient lighting, monochrome",
  },
];

function ImageGenerationExamples({ id }: IProps) {
  const platform = usePlatform();
  const generateImage = useGenerateImage();
  const { goBack, goToGenerationImagesResult, goToGenerationImages } =
    useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        headerChildren={
          <AppPanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Примеры
          </AppPanelHeader>
        }
      >
        <Div className={classes.container}>
          {examples.map((example) => (
            <ContentCard
              onClick={() => {
                imageGeneration.applyExample(example);

                platform === Platform.VKCOM
                  ? goToGenerationImages()
                  : goToGenerationImagesResult();

                generateImage();
              }}
              key={example.url}
              src={example.url}
              className={classes.card}
              alt={example.prompt}
              subtitle={example.modelId}
              header={
                <div className={classes.title}>
                  {example.prompt}
                  <Spacing size={12} />
                  <Button style={{ width: "100%" }} mode="secondary">
                    Опробовать
                  </Button>
                </div>
              }
              maxHeight={250}
              headerComponent="h4"
            />
          ))}
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default ImageGenerationExamples;
