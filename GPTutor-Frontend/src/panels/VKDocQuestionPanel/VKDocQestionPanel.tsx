import * as React from "react";
import {
  Button,
  Div,
  Link,
  Panel,
  PanelHeader,
  Placeholder,
  Spacing,
  Textarea,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";

import booksImage from "./images/books.png";

import classes from "./VKDocQuestionPanel.module.css";
import { Icon24ExternalLinkOutline } from "@vkontakte/icons";
import { vkDocClient } from "$/entity/GPT/VkDocClient";
import { useNavigationContext } from "$/NavigationContext";
import PanelTitle from "$/components/PanelTitle";

interface IProps {
  id: string;
}

function VKDocQuestionPanel({ id }: IProps) {
  const { goToVkDocQuestionRequest } = useNavigationContext();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <PanelHeader>
            <PanelTitle
              title="Умная документация"
              mobileTitle="Умная документация"
            />
          </PanelHeader>
        }
      >
        <Div className={classes.container}>
          <div className={classes.containerWidth}>
            <Placeholder
              style={{ width: "100%" }}
              icon={<img src={booksImage} />}
              header="Умный поиск по документации ВКонтакте!"
            >
              <div>
                — Поиск по плейлисту{" "}
                <Link
                  href="https://www.youtube.com/playlist?list=PLrCZzMib1e9oEYXY8gwFh4jmLtaJbyehF"
                  target="_blank"
                >
                  курса разработки мини-приложений{" "}
                  <Icon24ExternalLinkOutline width={16} height={16} />
                </Link>
              </div>
              <div>
                — Поиск по документации{" "}
                <Link href="https://dev.vk.com/ru" target="_blank">
                  dev.vk.com{" "}
                  <Icon24ExternalLinkOutline width={16} height={16} />
                </Link>
              </div>
              <div>
                — Поиск по документации{" "}
                <Link href="https://vkcom.github.io/VKUI/" target="_blank">
                  VKUI <Icon24ExternalLinkOutline width={16} height={16} />
                </Link>
              </div>
            </Placeholder>
            <Textarea
              value={vkDocClient.searchValue$.get()}
              onChange={(e) => vkDocClient.searchValue$.set(e.target.value)}
              style={{ width: "100%" }}
              placeholder="Как монетизировать мини приложение?"
            />
            <Spacing size={20} />
            <Button
              loading={vkDocClient.loading$.get()}
              size="l"
              mode="outline"
              style={{ width: "100%" }}
              onClick={async () => {
                await vkDocClient.getResult();
                if (vkDocClient.result$.get()) {
                  goToVkDocQuestionRequest();
                }
              }}
            >
              Получить ответ ✨
            </Button>
          </div>
        </Div>
      </AppContainer>
    </Panel>
  );
}

export default VKDocQuestionPanel;
