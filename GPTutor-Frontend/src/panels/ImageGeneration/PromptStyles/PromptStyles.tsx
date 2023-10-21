import { Card, Chip } from "@vkontakte/vkui";
import React from "react";
import { imageGeneration } from "$/entity/image";

function PromptStyles() {
  const imageGenerationPrompt = imageGeneration.imageGenerationPrompt;

  if (imageGenerationPrompt.selectedStyles$.get().length === 0) {
    return null;
  }

  return (
    <Card
      mode="outline"
      style={{ backgroundColor: "var(--vkui--color_field_background)" }}
    >
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
    </Card>
  );
}

export default PromptStyles;
