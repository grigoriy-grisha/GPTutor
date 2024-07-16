import * as React from "react";
import {
  Div,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  Spacing,
  Title,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { vkDocClient } from "$/entity/GPT/VkDocClient";
import { MessengerParagraph } from "$/components/Messenger/MessengerParagraph";
import { GptMessage, GPTRoles } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";
import PanelTitle from "$/components/PanelTitle";
import { AnswerSources } from "$/panels/VkDocQuestionRequest/AnswerSources";

interface IProps {
  id: string;
}

function VkDocQuestionRequest({ id }: IProps) {
  const { goBack } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <PanelTitle title="Результат" mobileTitle="Результат" />
          </PanelHeader>
        }
      >
        <Div>
          <Title>Вопрос:</Title>
          <Spacing size={4} />
          <Title level="2">{vkDocClient.result$.get()?.question}</Title>
          <Spacing size={12} />
          <Separator wide />
          <Spacing size={12} />
          <Title level="2">Ответ | GigaChat:</Title>
          <Spacing size={18} />
          <MessengerParagraph
            message={
              new GptMessage(
                vkDocClient.result$.get()?.generation || "",
                GPTRoles.assistant
              )
            }
          />
          <Spacing size={12} />
          <Separator wide />
          <Spacing size={8} />
          <Title level="2">Источники:</Title>
          <Spacing size={18} />
          <AnswerSources
            documents={vkDocClient.result$.get()?.documents || []}
          />
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default VkDocQuestionRequest;
