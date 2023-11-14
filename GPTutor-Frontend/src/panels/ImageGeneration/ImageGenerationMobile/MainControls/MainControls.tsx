import React from "react";

import {
  Button,
  Card,
  Div,
  FormItem,
  Spacing,
  Textarea,
} from "@vkontakte/vkui";
import { Icon24MagicWandOutline } from "@vkontakte/icons";

import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { imageGeneration } from "$/entity/image";
import { PromptStyles } from "$/panels/ImageGeneration/PromptStyles";
import { useNavigationContext } from "$/NavigationContext";
import { attempts } from "$/entity/attempts";

function MainControls() {
  const { goToGenerationImagesPrompts } = useNavigationContext();
  const generateImage = imageGeneration.generateImage$;
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
            placeholder="Напишите запрос для изображения"
          />
        </FormItem>
        <Spacing size={6} />
        <PromptStyles />

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
        <Button
          disabled={generationIsDisable}
          loading={generateImage.loading.get()}
          className={classes.button}
          size="l"
          align="center"
          mode="primary"
          onClick={imageGeneration.generate}
        >
          Сгенерировать
        </Button>
      </Div>
    </Card>
  );
}

export default MainControls;
