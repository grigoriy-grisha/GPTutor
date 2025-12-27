import { FC, useEffect } from "react";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Placeholder,
  ScreenSpinner,
  Group,
  SimpleCell,
} from "@vkontakte/vkui";
import { Icon28MoneyHistoryBackwardOutline, Icon24ChevronRight } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useProfileViewModel } from "../../viewModels/ProfileViewModel";
import { BalanceSection } from "./BalanceSection";
import { ApiKeySection } from "./ApiKeySection";
import { CodeExamplesSection } from "./CodeExamplesSection";
import { DiscountSection } from "./DiscountSection";
import { DEFAULT_VIEW_PANELS } from "../../routes";
import "../../styles/prism.css";
import { observer } from "mobx-react-lite";

export interface ProfileProps extends NavIdProps {}

export const Profile: FC<ProfileProps> = observer(({ id }) => {
  const routeNavigator = useRouteNavigator();
  const {
    profile,
    vkData,
    loading,
    updatingToken,
    activeCodeExample,
    setActiveCodeExample,
    loadProfile,
    updateToken,
  } = useProfileViewModel();

  const handleOpenUsage = () => {
    routeNavigator.push(`/${DEFAULT_VIEW_PANELS.USAGE}`);
  };

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader>Профиль</PanelHeader>
        <Placeholder>
          <ScreenSpinner />
        </Placeholder>
      </Panel>
    );
  }

  if (!profile || !vkData) {
    return (
      <Panel id={id}>
        <PanelHeader>Профиль</PanelHeader>
        <Placeholder>Не удалось загрузить данные профиля</Placeholder>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <DiscountSection />

      <BalanceSection balance={profile.balance} onReload={loadProfile} />

      <Group>
        <SimpleCell
          before={<Icon28MoneyHistoryBackwardOutline />}
          after={<Icon24ChevronRight />}
          onClick={handleOpenUsage}
        >
          История использования
        </SimpleCell>
      </Group>

      <ApiKeySection
        apiKey={profile.apiKey}
        updatingToken={updatingToken}
        onUpdateToken={updateToken}
      />

 

      <CodeExamplesSection
        apiKey={profile.apiKey}
        activeCodeExample={activeCodeExample}
        onCodeExampleChange={setActiveCodeExample}
      />
    </Panel>
  );
});
