import { Placeholder, Spinner, Title } from "@vkontakte/vkui";
import React from "react";
import { chatGpt } from "$/entity/GPT";

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

  return (
    <>
      {anecdoteMessage && (
        <Title level="3" weight="2">
          {anecdoteMessage.content$.get()}
        </Title>
      )}
    </>
  );
}

export default AnecdoteGenerationContent;
