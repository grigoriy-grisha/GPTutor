import React from "react";

import {
  Avatar,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
  Text,
} from "@vkontakte/vkui";
import { Icon12OnlineMobile } from "@vkontakte/icons";

import { ChatGPTLogo } from "../../../icons";
import { IsTypingLoader } from "../../IsTypingLoader";

import classes from "./Header.module.css";

function Header({ goBack, isTyping }) {
  return (
    <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
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
    </PanelHeader>
  );
}

export default Header;
