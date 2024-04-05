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
  Icon28MessageHeart,
  Icon28Users,
} from "@vkontakte/icons";
import { ChatGPTLogo } from "$/icons";
import React from "react";

interface IProps {
  id: string;
  settlingHeight: number;
}

function ApplicationInfoStableArt({ id, settlingHeight }: IProps) {
  const { goBack, goToOpenSource } = useNavigationContext();
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
              Stable Art{" — "}
            </Title>
            это развлекательное приложение-инструмент, которое дает возможность
            генерировать любые нейро-картинки с помощью технологии Stable
            Diffusion.
          </Text>
        </AppDiv>
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
              <ChatGPTLogo borderRadius="25" />
            </span>
          }
          after={
            <Icon28ChevronRightOutline fill="var(--vkui--color_text_secondary)" />
          }
          subtitle="Бесплатный ChatGPT ВКонтакте!"
        >
          <Text weight="2">GPTutor</Text>
        </SimpleCell>
      </Group>
      <Spacing size={12} />
    </ModalPage>
  );
}

export default ApplicationInfoStableArt;
