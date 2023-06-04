import React from "react";

import { Panel, Placeholder, Spinner } from "@vkontakte/vkui";

import { AppContainer } from "$/components/AppContainer";
import Cards from "$/components/Cards";
import { lessonsController } from "$/entity/lessons";
import { chatGpt } from "$/entity/GPT";
import { useNavigationContext } from "$/NavigationContext";
import { applicationUser } from "$/entity/user/ApplicationUser";
import { ChatGPTLogo } from "$/icons";

import FreeDialogBlock from "./FreeDialogBlock";
import HomeHeader from "./HomeHeader";

import classes from "./Home.module.css";


interface IProps {
  id: string;
}

function Home({ id }: IProps) {
  const { goToOpenSource, goToChapters, goToChat } = useNavigationContext();

  const userIsLoading = applicationUser.createUser$.loading.get();

  return (
    <Panel id={id}>
      {userIsLoading ? (
        <Placeholder
          style={{ paddingTop: 170 }}
          icon={<ChatGPTLogo borderRadius="none" size={70} />}
          header="GPTutor"
        >
          <Spinner style={{ paddingTop: 10 }} size="medium" />
        </Placeholder>
      ) : (
        <AppContainer
          className={classes.group}
          isSecondary
          headerChildren={<HomeHeader goToOpenSource={goToOpenSource} />}
        >
          <Cards
            chapters={lessonsController.chapters}
            isTop
            title="Все темы для обучения"
            onClickChapter={(chapter) => {
              lessonsController.setCurrentChapter(chapter.chapterType);
              goToChapters();
            }}
          />
          <FreeDialogBlock
            goToFreeDialog={() => {
              goToChat();
              lessonsController.clearLesson();
              chatGpt.currentHistory = null;
            }}
          />
        </AppContainer>
      )}
    </Panel>
  );
}

export default Home;
