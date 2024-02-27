import React from "react";
import {
  Button,
  Link,
  ModalCard,
  Platform,
  Spacing,
  Text,
  usePlatform,
} from "@vkontakte/vkui";
import { useNavigationContext } from "$/NavigationContext";
import { Icon28SadFaceOutline } from "@vkontakte/icons";
import { useGenerateImage } from "$/hooks/useGenerateImage";

interface IProps {
  id: string;
}

function WeakRequestModal({ id }: IProps) {
  const platform = usePlatform();
  const { goBack, goToGenerationImagesResult } = useNavigationContext();
  const generateImage = useGenerateImage();
  return (
    <ModalCard
      id={id}
      onClose={() => goBack()}
      icon={<Icon28SadFaceOutline width={54} height={54} />}
      header="Слабый запрос!"
      subheader={
        <span style={{ wordBreak: "break-word" }}>
          Старайтесь писать больше ключевых слов, уточнений и стилей{" "}
          <Text weight="1">через запятую!</Text> Нейросети тяжело выстроить
          образ из 1-4 слов.{" "}
          <Link
            target="_blank"
            href="https://vk.com/@gptutor-primer-sozdaniya-kachestvennogo-zaprosa"
          >
            Пример создания качественного запроса.
          </Link>
        </span>
      }
      actions={
        <div style={{ width: "100%" }}>
          <Button
            width="100%"
            size="m"
            mode="outline"
            stretched
            onClick={goBack}
          >
            К запросу
          </Button>
          <Spacing size={12} />
          <Button
            width="100%"
            size="m"
            mode="primary"
            stretched
            onClick={() => {
              generateImage();

              goBack();

              setTimeout(() => {
                if (platform !== Platform.VKCOM) goToGenerationImagesResult();
              }, 300);
            }}
          >
            Сгенерировать
          </Button>
        </div>
      }
      subheaderComponent="h5"
      headerComponent="h2"
    ></ModalCard>
  );
}

export default WeakRequestModal;
