import React from "react";

import {
  Avatar,
  IconButton,
  PanelHeader,
  PanelHeaderBack,
  Platform,
  SimpleCell,
  Text,
  usePlatform,
} from "@vkontakte/vkui";
import {
  Icon12OnlineMobile,
  Icon24HistoryBackwardOutline,
  Icon28HistoryBackwardOutline,
} from "@vkontakte/icons";

import { ChatGPTLogo } from "$/icons";
import { IsTypingLoader } from "$/components/IsTypingLoader";

import classes from "./Header.module.css";

interface IProps {
  goBack: () => void;
  goToHistory: () => void;
  isTyping: boolean;
}

function Header({ goBack, goToHistory, isTyping }: IProps) {
  const platform = usePlatform();

  return (
    <PanelHeader
      className={`${classes.header} ${
        platform === Platform.VKCOM ? classes.desktopHeader : ""
      } ${platform !== Platform.VKCOM ? classes.compactHeader : ""} `}
      before={<PanelHeaderBack onClick={goBack} />}
    >
      <SimpleCell
        disabled
        before={
          <Avatar
            size={24}
            fallbackIcon={
              <div className={classes.fallbackIcon}>
                <ChatGPTLogo />
              </div>
            }
          />
        }
        subtitle={
          <div className={classes.headerSubtitle}>
            {isTyping ? (
              <>
                <IsTypingLoader />
                Печатает
              </>
            ) : (
              <>
                онлайн
                <Icon12OnlineMobile className={classes.iconMobile} />
              </>
            )}
          </div>
        }
      >
        <Text weight="1">Chat GPT</Text>
      </SimpleCell>
      <IconButton className={classes.historyIcon} onClick={goToHistory}>
        {platform === Platform.VKCOM ? (
          <Icon28HistoryBackwardOutline fill="var(--vkui--color_background_accent_themed)" />
        ) : (
          <Icon24HistoryBackwardOutline fill="var(--vkui--color_background_accent_themed)" />
        )}
      </IconButton>
    </PanelHeader>
  );
}

export default Header;
