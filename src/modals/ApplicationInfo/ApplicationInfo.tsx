import React from "react";

import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  Separator,
  SimpleCell,
  Text,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import {
  Icon24Share,
  Icon28ChevronRightOutline,
  Icon28Favorite,
  Icon28LogoVk,
  Icon28MessageHeart,
  Icon28Users,
} from "@vkontakte/icons";

import { useNavigationContext } from "$/NavigationContext";
import { GithubIcon } from "$/icons";
import { AppDiv } from "$/components/AppDiv";
import { useApplicationInfo } from "./hooks/useApplicationInfo";

interface IProps {
  id: string;
}

function ApplicationInfo({ id }: IProps) {
  const { goBack, goToOpenSource } = useNavigationContext();
  const { sizeX } = useAdaptivityConditionalRender();
  const { subscribe, favourites, share } = useApplicationInfo();
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
        Приложение
      </ModalPageHeader>

      <Separator wide />

      <Group>
        <AppDiv>
          <Text weight="3">
            <Text style={{ display: "inline" }} weight="1" as="span">
              GPTutor{" — "}
            </Text>
            это образовательное приложение, которое предлагает уникальный подход
            к обучению вместе с чат-помощником Chat GPT.
          </Text>
        </AppDiv>
      </Group>
      <Group>
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
      <Group>
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
