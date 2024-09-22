import { useNavigationContext } from "$/NavigationContext";
import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  SimpleCell,
  Spacing,
  Text,
  Title,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import { useApplicationInfo } from "$/modals/ApplicationInfo/hooks/useApplicationInfo";
import { AppDiv } from "$/components/AppDiv";
import {
  Icon24Share,
  Icon28ChevronRightOutline,
  Icon28Favorite,
  Icon28LogoVk,
  Icon28Users,
} from "@vkontakte/icons";
import { ChatGPTLogo, StableArtLogo } from "$/icons";
import React from "react";
import { appService } from "$/services/AppService";

interface IProps {
  id: string;
  settlingHeight: number;
}

function ApplicationInfoHumor({ id, settlingHeight }: IProps) {
  const { goBack } = useNavigationContext();
  const { sizeX } = useAdaptivityConditionalRender();
  const { subscribe, favourites, share, getAppLink } = useApplicationInfo();

  return (
    <ModalPage settlingHeight={settlingHeight} id={id}>
      <ModalPageHeader
        before={
          sizeX.compact && (
            <PanelHeaderClose
              className={sizeX.compact.className}
              onClick={goBack}
            />
          )
        }
      >
        <Title level="1" Component="h1">
          Приложение
        </Title>
      </ModalPageHeader>
      <Group style={{ marginTop: 8 }}>
        <AppDiv>
          <Text weight="3">
            <Title
              style={{ display: "inline" }}
              level="3"
              as="span"
              Component="h3"
            >
              НейроПриколы{" — "}
            </Title>
            это развлекательное приложение, где вы можете с помощью нейросети
            ChatGPT генерировать приколы!
          </Text>
        </AppDiv>
      </Group>
      <Group style={{ padding: 0 }}>
        <SimpleCell
          before={<Icon28LogoVk />}
          href="https://vk.com/nuuchetam"
          target="_blank"
        >
          <Text weight="2">Наше сообщество</Text>
        </SimpleCell>
        <SimpleCell onClick={subscribe} before={<Icon28Users />}>
          <Text weight="2">Вступить в группу</Text>
        </SimpleCell>
        <SimpleCell onClick={favourites} before={<Icon28Favorite />}>
          <Text weight="2">Добавить в избранное</Text>
        </SimpleCell>
        <SimpleCell
          onClick={share}
          before={<Icon24Share width={28} height={28} />}
        >
          <Text weight="2">Поделиться</Text>
        </SimpleCell>
      </Group>
      <Group style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SimpleCell
          href="https://vk.com/app51602327"
          target="_blank"
          before={
            <span style={{ paddingRight: 4 }}>
              <ChatGPTLogo borderRadius="25" />
            </span>
          }
          after={
            <Icon28ChevronRightOutline fill="var(--vkui--color_text_secondary)" />
          }
          subtitle="Бесплатный ChatGPT ВКонтакте!"
        >
          <Text weight="2">{appService.getGPTName()}</Text>
        </SimpleCell>
        <SimpleCell
          href="https://vk.com/app51692825"
          target="_blank"
          before={
            <span style={{ paddingRight: 4 }}>
              <StableArtLogo borderRadius="25%" />
            </span>
          }
          after={
            <Icon28ChevronRightOutline fill="var(--vkui--color_text_secondary)" />
          }
          subtitle="Бесплатный генератор нейро-картинок ВКонтакте!"
        >
          <Text weight="2">Stable Art</Text>
        </SimpleCell>
      </Group>
      <Spacing size={12} />
    </ModalPage>
  );
}

export default ApplicationInfoHumor;
