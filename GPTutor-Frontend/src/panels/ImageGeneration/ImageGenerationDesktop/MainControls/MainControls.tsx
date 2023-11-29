import React from "react";

import {
  Button,
  Card,
  Checkbox,
  Div,
  FormItem,
  Spacing,
  Textarea,
  Text,
} from "@vkontakte/vkui";
import { Icon24MagicWandOutline } from "@vkontakte/icons";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import { PromptStyles } from "$/panels/ImageGeneration/PromptStyles";
import { useNavigationContext } from "$/NavigationContext";
import { attempts } from "$/entity/attempts";
import { useGenerateImage } from "$/hooks/useGenerateImage";

function MainControls() {
  const { goToGenerationImagesPrompts } = useNavigationContext();

  const generateImage = useGenerateImage();

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
            placeholder="космонавт верхном на лошади, hd, Космическое сияние, высокое качество, профессиональное фото"
          />
        </FormItem>
        <Spacing size={6} />
        <PromptStyles />
        <Spacing size={6} />
        <div className={classes.promptButtons}>
          <Button
            mode="outline"
            onClick={imageGeneration.toggleEnhancePrompt}
            disabled={!imageGeneration.enhanceAvailable$.get()}
          >
            <Checkbox
              tabIndex={-1}
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
          <Button
            className={classes.button}
            onClick={() => goToGenerationImagesPrompts()}
            size="l"
            mode="outline"
          >
            Собрать запрос ✨
          </Button>
        </div>

        <Spacing size={8} />
        {imageGeneration.loading$.get() ? (
          <Button
            disabled={generationIsDisable}
            className={classes.button}
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
            onClick={generateImage}
            after={<Icon24MagicWandOutline />}
          >
            Сгенерировать
          </Button>
        )}
      </Div>
    </Card>
  );
}

export default MainControls;
