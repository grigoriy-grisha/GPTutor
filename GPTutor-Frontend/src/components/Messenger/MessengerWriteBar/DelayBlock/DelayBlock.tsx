import React from "react";
import { IconButton, Separator, Text } from "@vkontakte/vkui";
import { Icon28Cancel, Icon28ClockOutline } from "@vkontakte/icons";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import classes from "./DelayBlock.module.css";
import { AppDiv } from "$/components/AppDiv";

interface IProps {
  chatGpt: ChatGptTemplate;
}

function DelayBlock({ chatGpt }: IProps) {
  return (
    <>
      <Separator wide />
      <AppDiv
        style={{ paddingTop: 4, paddingBottom: 4 }}
        className={classes.delayBlock}
      >
        <div className={classes.content}>
          <Icon28ClockOutline className={classes.clock} />
          <Text weight="2">Терпение! Вы в очереди на запрос</Text>
        </div>

        <IconButton onClick={() => chatGpt.closeDelay()}>
          <Icon28Cancel className={classes.close} />
        </IconButton>
      </AppDiv>
    </>
  );
}

export default DelayBlock;
