import { Placeholder, Spinner, Title } from "@vkontakte/vkui";
import React from "react";
import { chatGpt } from "$/entity/GPT";
import { ImageGenerationBlock } from "$/components/ImageGenerationBlock";
import { imageGeneration } from "$/entity/image";

function AnecdoteGenerationContent() {
  const anecdoteMessage = chatGpt.chatGptAnecdote.getLastAssistantMessage();

  const loading = chatGpt.chatGptAnecdote.sendCompletions$.loading.get();

  if (!loading && !anecdoteMessage?.content$.get()) {
    return (
      <Placeholder header="НейроПриколы">Сгенерируйте нейрошутку!</Placeholder>
    );
  }

  if (!anecdoteMessage && loading) {
    return <Spinner size="large" />;
  }

  const image = chatGpt.chatGptAnecdote.image$.get();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "450px", maxHeight: "450px", width: "100%" }}>
        <ImageGenerationBlock
          isEmpty={!image}
          timer={chatGpt.chatGptAnecdote.timerImage}
          widthView={imageGeneration.widthView$.get()}
          heightView={imageGeneration.heightView$.get()}
          url={image}
          loading={!chatGpt.chatGptAnecdote.timerImage.isStopped$.get()}
        />
      </div>

      {anecdoteMessage && (
        <Title level="3" weight="2" style={{ marginTop: 28 }}>
          {anecdoteMessage.content$.get()}
        </Title>
      )}
    </div>
  );
}

export default AnecdoteGenerationContent;
