import { Card, Chip, IconButton, Spacing } from "@vkontakte/vkui";
import React from "react";
import { imageGeneration } from "$/entity/image";
import { Icon16CopyOutline } from "@vkontakte/icons";

import classes from "./PromptStyles.module.css";
import { copyService } from "$/services/CopyService";
import { snackbarNotify } from "$/entity/notify";

function PromptStyles() {
  const imageGenerationPrompt = imageGeneration.imageGenerationPrompt;

  if (imageGenerationPrompt.selectedStyles$.get().length === 0) {
    return null;
  }

  return (
    <>
      <Spacing size={6} />

      <Card mode="outline" className={classes.container}>
        <div style={{ padding: 4 }}>
          {imageGenerationPrompt.selectedStyles$.get().map((style) => (
            <Chip
              style={{ margin: 2 }}
              key={style}
              value={style}
              onRemove={() => imageGenerationPrompt.$selectStyles(style)}
            >
              {style}
            </Chip>
          ))}
        </div>
        <div>
          <IconButton>
            <Icon16CopyOutline
              className={classes.copy}
              onClick={() => {
                copyService.copyToClickBoard$
                  .run(imageGenerationPrompt.selectedStyles$.get().join(", "))
                  .then(() => {
                    snackbarNotify.notify({
                      type: "success",
                      message: "Скопировано",
                    });
                  })
                  .catch(() =>
                    snackbarNotify.notify({
                      type: "error",
                      message: "Не удалось скопировать",
                    })
                  );
              }}
            />
          </IconButton>
        </div>
      </Card>
    </>
  );
}

export default PromptStyles;
