import * as React from "react";
import {
  Button,
  Div,
  Panel,
  PanelHeader,
  Placeholder,
  Spacing,
  Textarea,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import booksImage from "./images/books.png";

import classes from "./VKDocQuestionPanel.module.css";
import { Icon28MagicWandOutline } from "@vkontakte/icons";
import { useEffect } from "react";
import { conversationVKDoc } from "$/api/completions";
import { vkDocClient } from "$/entity/GPT/VkDocClient";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  id: string;
}

function VKDocQuestionPanel({ id }: IProps) {
  const { goToVkDocQuestionRequest } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer headerChildren={<PanelHeader>SmartDoc</PanelHeader>}>
        <Div className={classes.container}>
          <div style={{ width: "60%", marginTop: "10%" }}>
            <Placeholder
              style={{ width: "100%" }}
              icon={<img src={booksImage} />}
              header="Умный поиск по документации Вконтакте"
            />
            <Textarea
              value={vkDocClient.searchValue$.get()}
              onChange={(e) => vkDocClient.searchValue$.set(e.target.value)}
              style={{ width: "100%" }}
              placeholder="Задайте ваш вопрос!"
            />
            <Spacing size={20} />
            <Button
              loading={vkDocClient.loading$.get()}
              size="l"
              mode="outline"
              after={<Icon28MagicWandOutline />}
              style={{ width: "100%" }}
              onClick={async () => {
                await vkDocClient.getResult();
                goToVkDocQuestionRequest();
              }}
            >
              Получить ответ
            </Button>
          </div>
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default VKDocQuestionPanel;
