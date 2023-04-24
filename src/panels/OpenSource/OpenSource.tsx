import React from "react";
import {
  Banner,
  Header,
  HorizontalCell,
  HorizontalScroll,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { Icon28LogoVk } from "@vkontakte/icons";

import { AppContainer } from "../../components/AppContainer";
import { CardBlock } from "../../components/CardBlock";
import { CssIcon, DignalsIcon, ReactIcon, TypeScriptIcon } from "../../icons";
import { ChapterTypes, lessonsController } from "../../entity/lessons";

import { Repository } from "./Repository";
import { Issues } from "./Issues";

import classes from "./OpenSource.module.css";

interface IProps {
  id: string;
  goBack: () => void;
  goToChapters: () => void;
}

const stack = [
  {
    icon: <ReactIcon />,
    header: "React",
    chapter: ChapterTypes.React,
  },
  {
    icon: <TypeScriptIcon />,
    header: "Typescript",
    href: "https://www.typescriptlang.org/",
  },
  {
    icon: <DignalsIcon />,
    header: "Dignals",
    href: "https://github.com/dmitriypereverza/dignals",
  },
  {
    icon: <Icon28LogoVk fill="var(--vkui--color_background_accent_themed)" />,
    header: "VK/UI",
    href: "https://vkcom.github.io/VKUI/",
  },
  { icon: <CssIcon />, header: "CSS", chapter: ChapterTypes.HTMLCSS },
];

function OpenSource({ id, goBack, goToChapters }: IProps) {
  return (
    <Panel id={id}>
      <AppContainer
        isSecondary
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Присоединяйся
          </PanelHeader>
        }
      >
        {({ height }) => (
          <div style={{ minHeight: height }} className={classes.container}>
            <CardBlock isTop>
              <Header mode="tertiary">Стек технологий</Header>
              <HorizontalScroll>
                <div style={{ display: "flex" }}>
                  {stack.map(({ icon, header, chapter, href }, index) => (
                    <HorizontalCell
                      target="_blank"
                      disabled
                      size="l"
                      key={index}
                      href={href}
                    >
                      <Banner
                        onClick={() => {
                          if (!chapter) return;
                          lessonsController.setCurrentChapter(chapter);
                          goToChapters();
                        }}
                        className={classes.stackBlock}
                        asideMode="expand"
                        before={icon}
                        header={header}
                      />
                    </HorizontalCell>
                  ))}
                </div>
              </HorizontalScroll>
            </CardBlock>
            <Repository />
            <Issues />
          </div>
        )}
      </AppContainer>
    </Panel>
  );
}

export default OpenSource;
