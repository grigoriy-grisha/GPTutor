import { FC } from "react";
import {
  CardScroll,
  DisplayTitle,
  Flex,
  Group,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Icon24BracketsSlashOutline,
  Icon24DocumentTextOutline,
  Icon28KeyOutline,
  Icon28KeySquareOutline,
  Icon28MoneySendOutline,
  Icon28PaymentCardAddOutline,
} from "@vkontakte/icons";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import { StepCard } from "./StepCard";

import classes from "./Home.module.css";

export const StepsSection: FC = () => {
  const navigator = useRouteNavigator();
  const { isDesktop } = useAdaptivityWithJSMediaQueries();

  const handleProfileClick = () => {
    navigator.push(`/${DEFAULT_VIEW_PANELS.PROFILE}`);
  };

  const handleDocsClick = () => {
    window.open("https://docs.giga-router.ru/", "_blank");
  };

  return (
    <Group>
      <CardScroll
        className={classes.stepsSectionWrapper}
        size={isDesktop ? "s" : "l"}
      >
        <StepCard
          stepNumber="1"
          title="Пополни баланс"
          icon={<Icon28MoneySendOutline style={{ marginLeft: 4 }} />}
          description={
            <DisplayTitle level="4" weight="1">
              100₽ Бесплатно!
            </DisplayTitle>
          }
          buttonText="Посмотреть баланс"
          buttonIcon={<Icon28PaymentCardAddOutline width={24} height={24} />}
          onButtonClick={handleProfileClick}
        />

        <StepCard
          stepNumber="2"
          title="Получи API-ключ"
          icon={
            <Icon28KeyOutline
              style={{
                color: "var(--vkui--color_background_accent_themed)",
                marginLeft: 4,
              }}
            />
          }
          description={
            <DisplayTitle level="4">sk - ••••••••••••••••••</DisplayTitle>
          }
          buttonText="Получить ключ"
          buttonIcon={<Icon28KeySquareOutline width={24} height={24} />}
          onButtonClick={handleProfileClick}
        />

        <StepCard
          stepNumber="3"
          title="Используй API"
          icon={
            <Icon24BracketsSlashOutline
              width={28}
              height={28}
              style={{
                color: "var(--vkui--color_background_accent_themed)",
                marginLeft: 4,
              }}
            />
          }
          description={
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
          }
          buttonText="Документация"
          buttonIcon={<Icon24DocumentTextOutline />}
          onButtonClick={handleDocsClick}
        />
      </CardScroll>
    </Group>
  );
};

