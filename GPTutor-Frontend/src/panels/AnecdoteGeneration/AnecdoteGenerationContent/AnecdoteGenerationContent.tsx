import {
  Button,
  Link,
  Placeholder,
  Platform,
  Spacing,
  Spinner,
  Title,
  useConfigProvider,
} from "@vkontakte/vkui";
import React from "react";
import { chatGpt } from "$/entity/GPT";
import { ImageGenerationBlock } from "$/components/ImageGenerationBlock";
import { imageGeneration } from "$/entity/image";
import { Icon28ArrowDownToSquareOutline } from "@vkontakte/icons";
import { downloadService } from "$/services/DownloadService";

function AnecdoteGenerationContent() {
  const anecdoteMessage = chatGpt.chatGptAnecdote.getLastAssistantMessage();
  const { isWebView, platform } = useConfigProvider();

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
          isDisableHover={true}
          isEmpty={!image}
          timer={chatGpt.chatGptAnecdote.timerImage}
          widthView={imageGeneration.widthView$.get()}
          heightView={imageGeneration.heightView$.get()}
          url={image}
          loading={!chatGpt.chatGptAnecdote.timerImage.isStopped$.get()}
        />
        <Spacing size={6} />
        <Link
          style={{ fontSize: 14 }}
          target="_blank"
          href="https://t.me/DeepGPTBot"
        >
          Сгенерировать любую картинку можно у нас в боте!
        </Link>
        <Spacing size={10} />
        <Button
          loading={chatGpt.chatGptAnecdote.sendCompletions$.loading.get()}
          disabled={!image}
          size="m"
          style={{ width: "100%" }}
          mode="outline"
          after={<Icon28ArrowDownToSquareOutline />}
          onClick={async () => {
            if (!isWebView) {
              downloadService.downloadBase64(image, "anecdote-image.png");

              return;
            }

            downloadService.appDownloadLink(
              isWebView ? platform : Platform.VKCOM,
              image,
              "anecdote-image.png"
            );
          }}
        >
          Скачать
        </Button>
        <Spacing size={20} />
      </div>

      {anecdoteMessage && (
        <Title level="3" weight="2" style={{ marginTop: 90 }}>
          {anecdoteMessage.content$.get()}
        </Title>
      )}
    </div>
  );
}

export default AnecdoteGenerationContent;
