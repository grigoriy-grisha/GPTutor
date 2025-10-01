import { FC } from "react";
import {
  Button,
  Card,
  CardScroll,
  ContentCard,
  Counter,
  DisplayTitle,
  Div,
  Flex,
  Group,
  Headline,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  Spacing,
  useAdaptivityWithJSMediaQueries,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { DEFAULT_VIEW_PANELS } from "../routes";
import {
  Icon16LinkOutline,
  Icon24BracketsSlashOutline,
  Icon24DocumentTextOutline,
  Icon28KeyOutline,
  Icon28KeySquareOutline,
  Icon28MoneySendOutline,
  Icon28PaymentCardAddOutline,
} from "@vkontakte/icons";

export interface HomeProps extends NavIdProps {}

export const Home: FC<HomeProps> = ({ id }) => {
  const navigator = useRouteNavigator();
  const { isDesktop } = useAdaptivityWithJSMediaQueries();

  const handleModelsClick = () => {
    navigator.push(`/${DEFAULT_VIEW_PANELS.MODELS}`);
  };

  return (
    <Panel id={id}>
      <PanelHeader>LLM API</PanelHeader>

      <Group>
        <Div>
          <DisplayTitle level="1">
            Единый API интерфейс нейросетей <br /> в одном сервисе!
          </DisplayTitle>
          <Spacing size={8} />
          <Headline
            level="1"
            style={{
              color: "#9c9c9c",
            }}
          >
            Без ВПН и зарубежных карт!
          </Headline>
        </Div>

        <Div>
          <WriteBar
            style={{
              border: "1px solid var(--vkui--color_separator_primary)",
              borderRadius: "var(--vkui--size_border_radius_paper--regular)",
            }}
            value=""
            // onChange={(e) => {}}
            after={
              <>
                <WriteBarIcon mode="send" />
              </>
            }
            placeholder="Что ты умеешь?"
          />
        </Div>
      </Group>
      <Group>
        <Div>
          <CardScroll size={isDesktop ? "s" : "l"}>
            <Card mode="shadow" style={{ minWidth: "320px" }}>
              <Div>
                <Flex align="center" gap={6}>
                  <Counter
                    mode="primary"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                    }}
                  >
                    <DisplayTitle level="2">1</DisplayTitle>
                  </Counter>
                  <DisplayTitle level="2">Пополни баланс</DisplayTitle>
                </Flex>
                <Spacing size={8} />
                <Flex align="center" gap={12}>
                  <Icon28MoneySendOutline style={{ marginLeft: 4 }} />
                  <DisplayTitle level="2">—</DisplayTitle>

                  <DisplayTitle level="4" weight="1">
                    100₽ Бесплатно!
                  </DisplayTitle>
                </Flex>
                <Spacing size={22} />
                <Button
                  onClick={() =>
                    navigator.push(`/${DEFAULT_VIEW_PANELS.PROFILE}`)
                  }
                  mode="outline"
                  size="m"
                  after={<Icon28PaymentCardAddOutline width={24} height={24} />}
                  style={{ width: "100%" }}
                >
                  Посмотреть баланс
                </Button>
              </Div>
            </Card>
            <Card mode="shadow" style={{ minWidth: "320px" }}>
              <Div>
                <Flex align="center" gap={8}>
                  <Counter
                    mode="primary"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                    }}
                  >
                    <DisplayTitle level="2">2</DisplayTitle>
                  </Counter>
                  <DisplayTitle level="2">Получи API-ключ</DisplayTitle>
                </Flex>
                <Spacing size={8} />
                <Flex align="center" gap={12}>
                  <Icon28KeyOutline
                    style={{
                      color: "var(--vkui--color_background_accent_themed)",
                      marginLeft: 4,
                    }}
                  />
                  <DisplayTitle level="2">—</DisplayTitle>
                  <DisplayTitle level="4">sk - ••••••••••••••••••</DisplayTitle>
                </Flex>
                <Spacing size={22} />
                <Button
                  onClick={() =>
                    navigator.push(`/${DEFAULT_VIEW_PANELS.PROFILE}`)
                  }
                  mode="outline"
                  size="m"
                  after={<Icon28KeySquareOutline width={24} height={24} />}
                  style={{ width: "100%" }}
                >
                  Получить ключ
                </Button>
              </Div>
            </Card>
            <Card mode="shadow" style={{ minWidth: "320px" }}>
              <Div>
                <Flex align="center" gap={8}>
                  <Counter
                    mode="primary"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                    }}
                  >
                    <DisplayTitle level="2">3</DisplayTitle>
                  </Counter>
                  <DisplayTitle level="2">Используй API</DisplayTitle>
                </Flex>
                <Spacing size={8} />
                <Flex align="center" gap={12}>
                  <Icon24BracketsSlashOutline
                    width={28}
                    height={28}
                    style={{
                      color: "var(--vkui--color_background_accent_themed)",
                      marginLeft: 4,
                    }}
                  />
                  <DisplayTitle level="2">—</DisplayTitle>
                  <Flex gap={16} justify="space-between">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: "#f0f2f5",
                      }}
                    >
                      <img
                        width="24px"
                        src="https://openrouter.ai/images/icons/GoogleGemini.svg"
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: "#f0f2f5",
                      }}
                    >
                      <img
                        width="24px"
                        src="https://openrouter.ai/images/icons/OpenAI.svg"
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: "#f0f2f5",
                      }}
                    >
                      <img
                        width="24px"
                        src="https://storage.yandexcloud.net/gptutor-bucket/68747470733a2f2f7a6f72676c652e636f2e756b2f77702d636f6e74656e742f75706c6f6164732f323032342f31312f436c617564652d61692d6c6f676f2e706e67.png"
                        alt=""
                      />
                    </div>
                  </Flex>
                </Flex>
                <Spacing size={22} />
                <Button
                  target="_blank"
                  href="https://docs.giga-router.ru/"
                  mode="outline"
                  size="m"
                  after={<Icon24DocumentTextOutline />}
                  style={{ width: "100%" }}
                >
                  Документация
                </Button>
              </Div>
            </Card>
          </CardScroll>
        </Div>
      </Group>
      <Group>
        <Div className="forceCardStyle">
          <ContentCard
            mode="outline"
            onClick={handleModelsClick}
            src={
              isDesktop
                ? "https://storage.yandexcloud.net/gptutor-bucket/Desktop.webp"
                : "https://storage.yandexcloud.net/gptutor-bucket/Mobile.webp"
            }
            title={<DisplayTitle>Одно API для всех моделей!</DisplayTitle>}
            description={
              <Headline
                weight="3"
                style={{ color: "var(--vkui--color_text_secondary)" }}
              >
                Доступ ко всем основным моделям осуществляется через единый
                интерфейс. OpenAI SDK работает "из коробки".
              </Headline>
            }
            caption={
              <Link onClick={handleModelsClick} after={<Icon16LinkOutline />}>
                Посмотреть модели
              </Link>
            }
            maxHeight={200}
          />
        </Div>
      </Group>
    </Panel>
  );
};
