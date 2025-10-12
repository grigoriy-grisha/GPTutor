import { FC } from "react";
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
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import {
  Icon20InfoCircleOutline,
  Icon28MoneySendOutline,
  Icon24RefreshOutline,
} from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { createCodeHTML } from "../../utils/codeFormatter";
import { userViewModel } from "../../viewModels/UserViewModel";
import { CopyButton } from "../../components";
import { MODALS } from "../../routes";

interface BalanceSectionProps {
  balance: number;
  onReload?: () => void;
}

export const BalanceSection: FC<BalanceSectionProps> = ({
  balance,
  onReload,
}) => {
  const routeNavigator = useRouteNavigator();
  const { isDesktop } = useAdaptivityWithJSMediaQueries();

  const handleTopUp = () => {
    routeNavigator.showModal(MODALS.TOP_UP_BALANCE);
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
          <div style={{ flex: 1 }}>
            <Title level="1">{balance.toFixed(4)}₽</Title>
            <div style={{ color: "#9c9c9c", fontSize: "14px" }}>
              Доступно для использования
            </div>
          </div>
          {onReload && (
            <IconButton onClick={onReload}>
              <Icon24RefreshOutline />
            </IconButton>
          )}
        </div>

        <Spacing size={16} />

        {isDesktop && (
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
        )}
      </Div>
    </Group>
  );
};
