import React, { FC } from "react";
import {
  Button,
  Div,
  Flex,
  Group,
  IconButton,
  Link,
  MiniInfoCell,
  Spacing,
  Title,
  Tooltip,
} from "@vkontakte/vkui";
import {
  Icon20InfoCircleOutline,
  Icon28MoneySendOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import { createCodeHTML } from "../../utils/codeFormatter";
import { userViewModel } from "../../viewModels/UserViewModel";
import { CopyButton } from "../../components";

interface BalanceSectionProps {
  balance: number;
}

export const BalanceSection: FC<BalanceSectionProps> = ({ balance }) => {
  const handleTopUp = () => {
    bridge
      .send("VKWebAppOpenPayForm", {
        app_id: 54187353,
        action: "pay-to-user",
        params: {
          user_id: userViewModel.getUserId(),
        },
      })
      .then((data) => {
        console.log(data);
        // if (data.status) {
        //   // Экран VK Pay показан
        // }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  return (
    <Group>
      <Div>
        <Title level="3">Баланс</Title>
        <Spacing size={12} />
        <Flex
          align="center"
          style={{ flexWrap: "nowrap" }}
          wrap="nowrap"
          gap={6}
        >
          <div
            style={{ width: "100%", fontWeight: 700 }}
            className="code-block"
            dangerouslySetInnerHTML={{
              __html: createCodeHTML(
                `ID: ${userViewModel.getUserId()}`,
                "python"
              ),
            }}
          />
          <CopyButton
            textToCopy={String(userViewModel.getUserId())}
            size={24}
          />
        </Flex>
        <Spacing size={12} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px",
            background: "var(--vkui--color_background_secondary)",
            borderRadius: "8px",
          }}
        >
          <Icon28MoneySendOutline />
          <div>
            <Title level="1">{balance.toFixed(4)}₽</Title>
            <div style={{ color: "#9c9c9c", fontSize: "14px" }}>
              Доступно для использования
            </div>
          </div>
        </div>

        <Spacing size={16} />

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button
            size="m"
            mode="outline"
            style={{ width: "100%" }}
            onClick={handleTopUp}
          >
            Пополнить баланс
          </Button>
          <Tooltip
            maxWidth={300}
            placement="top"
            description={
              <div style={{ width: 300 }}>
                <MiniInfoCell style={{ padding: 0 }} textWrap="full">
                  ИНН: <span style={{ fontWeight: 600 }}>027701131663</span>
                </MiniInfoCell>
                <Spacing size={4} />
                <MiniInfoCell style={{ padding: 0 }} textWrap="full">
                  <Link href="https://dev.vk.com/ru/user-agreement">
                    Пользовательское соглашение
                  </Link>
                  <br />
                  <Link href="https://dev.vk.com/ru/privacy-policy">
                    Политика конфиденциальности
                  </Link>{" "}
                </MiniInfoCell>
              </div>
            }
          >
            <IconButton style={{ height: 20 }}>
              <Icon20InfoCircleOutline />
            </IconButton>
          </Tooltip>
        </div>
      </Div>
    </Group>
  );
};
