import { FC } from "react";
import { NavIdProps, Panel, PanelHeader, Group, SimpleCell } from "@vkontakte/vkui";
import { Icon24CommentAddBadgeOutline, Icon24ExternalLinkOutline } from "@vkontakte/icons";
import { HeroSection } from "./HeroSection";
import { StepsSection } from "./StepsSection";
import { ModelsCard } from "./ModelsCard";

export interface HomeProps extends NavIdProps {}

export const Home: FC<HomeProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>LLM API</PanelHeader>
      <HeroSection />
      <StepsSection />
      <ModelsCard />

      <Group>
        <SimpleCell
          before={<Icon24CommentAddBadgeOutline width={28} height={28} />}
          after={<Icon24ExternalLinkOutline />}
          subtitle="Напишите нам — поможем разобраться!"
          href="https://vk.com/gigarouter"
          target="_blank"
        >
          Есть вопросы?
        </SimpleCell>
      </Group>
    </Panel>
  );
};


