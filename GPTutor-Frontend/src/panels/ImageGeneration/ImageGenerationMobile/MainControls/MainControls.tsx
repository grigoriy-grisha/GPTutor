import React from "react";

import {
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Div,
  FormItem,
  Spacing,
  Text,
  Textarea,
} from "@vkontakte/vkui";
import { Icon24MagicWandOutline, Icon24RepeatOutline } from "@vkontakte/icons";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import { PromptStyles } from "$/panels/ImageGeneration/PromptStyles";
import { useNavigationContext } from "$/NavigationContext";
import { attempts } from "$/entity/attempts";

function MainControls() {
  const { goToGenerationImagesPrompts, goToGenerationImagesResult } =
    useNavigationContext();

  const generationIsDisable = attempts.$requests.get() === 0;

  return (
    <Card mode="shadow">
      <Div>
        <FormItem
          className={classes.formItem}
          onFocus={() => {
            imageGeneration.error$.set("");
          }}
          htmlFor="prompt"
          status={imageGeneration.error$.get() ? "error" : "default"}
          bottom={imageGeneration.error$.get()}
        >
          <Textarea
            maxLength={1000}
            value={imageGeneration.prompt$.get()}
            onChange={(event) => imageGeneration.setPrompt(event.target.value)}
            id="prompt"
            className={classes.textArea}
            placeholder="Космонавт верхном на лошади, hd, Космическое сияние, высокое качество, профессиональное фото"
          />
        </FormItem>
        <Spacing size={6} />
        <PromptStyles />
        <Spacing size={6} />
        <Button
          className={classes.button}
          mode="outline"
          disabled={!imageGeneration.enhanceAvailable$.get()}
          onClick={imageGeneration.toggleEnhancePrompt}
        >
          <Checkbox
            disabled={!imageGeneration.enhanceAvailable$.get()}
            checked={imageGeneration.enhancePrompt$.get()}
            onChange={imageGeneration.toggleEnhancePrompt}
          >
            <Text
              weight="2"
              style={{ color: "var(--vkui--color_text_accent_themed)" }}
            >
              Улучшить запрос
            </Text>
          </Checkbox>
        </Button>
        <Spacing size={6} />
        <Button
          className={classes.button}
          onClick={() => goToGenerationImagesPrompts()}
          size="m"
          mode="outline"
          after={<Icon24MagicWandOutline />}
        >
          Собрать запрос
        </Button>
        <Spacing size={8} />

        {imageGeneration.loading$.get() ? (
          <Button
            style={{ width: "100%" }}
            size="l"
            align="center"
            mode="secondary"
            appearance="negative"
            onClick={imageGeneration.abortGenerate}
          >
            Отменить
          </Button>
        ) : (
          <Button
            disabled={generationIsDisable}
            className={classes.button}
            size="l"
            align="center"
            mode="primary"
            onClick={() => {
              imageGeneration.generate();
              if (imageGeneration.error$.get()) {
                return;
              }

              goToGenerationImagesResult();
            }}
          >
            Сгенерировать
          </Button>
        )}
      </Div>
    </Card>
  );
}

export default MainControls;
