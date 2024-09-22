import React from "react";

import {
  Avatar,
  classNames,
  PanelHeader,
  PanelHeaderBack,
  Platform,
  Separator,
  SimpleCell,
  Text,
  usePlatform,
} from "@vkontakte/vkui";
import { Icon12OnlineMobile } from "@vkontakte/icons";

import { ChatGPTLogo } from "$/icons";
import { IsTypingLoader } from "$/components/IsTypingLoader";

import classes from "./Header.module.css";
import { AppPanelHeader } from "$/components/AppPanelHeader";
import { appService } from "$/services/AppService";

interface IProps {
  goBack: () => void;
  isTyping: boolean;
}

function Header({ goBack, isTyping }: IProps) {
  const platform = usePlatform();

  return (
    <AppPanelHeader
      className={classNames(classes.header, {
        [classes.desktopHeader]: platform === Platform.VKCOM,
        [classes.compactHeader]: platform !== Platform.VKCOM,
      })}
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
        <Text weight="1">{appService.getGPTName()}</Text>
      </SimpleCell>
    </AppPanelHeader>
  );
}

export default Header;
