import React from "react";

import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  Separator,
  SimpleCell,
  Text,
  Title,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import {
  Icon20DonutCircleFillYellow,
  Icon24Share,
  Icon28ChevronRightOutline,
  Icon28Favorite,
  Icon28LogoVk,
  Icon28MessageHeart,
  Icon28Users,
} from "@vkontakte/icons";

import { useNavigationContext } from "$/NavigationContext";
import { GithubIcon, StableArtLogo } from "$/icons";
import { AppDiv } from "$/components/AppDiv";
import { useApplicationInfo } from "./hooks/useApplicationInfo";

interface IProps {
  id: string;
}

function ApplicationInfo({ id }: IProps) {
  const { goBack, goToOpenSource } = useNavigationContext();
  const { sizeX } = useAdaptivityConditionalRender();
  const { subscribe, favourites, share, getAppLink } = useApplicationInfo();

  return (
    <ModalPage settlingHeight={100} id={id}>
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
        <Title level="1">Приложение</Title>
      </ModalPageHeader>

      <Separator wide />

      <Group style={{ marginTop: 8 }}>
        <AppDiv>
          <Text weight="3">
            <Title style={{ display: "inline" }} level="3" as="span">
              GPTutor{" — "}
            </Title>
            это образовательное приложение, которое предлагает уникальный подход
            к обучению вместе с чат-помощником ChatGPT.
          </Text>
        </AppDiv>
      </Group>
      <Group style={{ marginTop: 0, padding: 0 }}>
        <SimpleCell
          before={<Icon20DonutCircleFillYellow width={28} height={24} />}
          href="https://vk.com/gptutor?source=description&w=donut_payment-220371433"
          target="_blank"
        >
          <Text weight="2">Снять ограничения</Text>
        </SimpleCell>
      </Group>
      <Group style={{ padding: 0 }}>
        <SimpleCell
          before={<Icon28LogoVk />}
          href="https://vk.com/gptutor"
          target="_blank"
        >
          <Text weight="2">Наше сообщество</Text>
        </SimpleCell>
        <SimpleCell
          before={<Icon28MessageHeart />}
          href="https://vk.me/public220371433"
          target="_blank"
        >
          <Text weight="2">Написать нам</Text>
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
          href={getAppLink()}
          target="_blank"
          before={
            <span style={{ paddingRight: 16 }}>
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
      <Group style={{ paddingTop: 0 }}>
        <SimpleCell
          onClick={goToOpenSource}
          before={<GithubIcon style={{ paddingRight: 16 }} />}
          after={
            <Icon28ChevronRightOutline fill="var(--vkui--color_text_secondary)" />
          }
        >
          <Text weight="2">OPEN SOURCE</Text>
        </SimpleCell>
      </Group>
    </ModalPage>
  );
}

export default ApplicationInfo;
