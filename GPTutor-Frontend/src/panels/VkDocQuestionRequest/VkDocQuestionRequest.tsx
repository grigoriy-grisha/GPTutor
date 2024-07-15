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
            Результат
          </PanelHeader>
        }
      >
        <Div>
          <Title>Запрос: {vkDocClient.result$.get()?.question}</Title>
          <Spacing size={8} />
          <Separator />
          <Spacing size={12} />
          <Title level="2">Ответ:</Title>
          <MessengerParagraph
            message={
              new GptMessage(
                vkDocClient.result$.get()?.generation || "",
                GPTRoles.assistant
              )
            }
          />
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default VkDocQuestionRequest;
