import React from "react";

import { Button, Link, Placeholder } from "@vkontakte/vkui";
import { Icon24ArrowRightSquareOutline } from "@vkontakte/icons";

import { ChatGPTLogo } from "$/icons";
import { CardBlock } from "$/components/CardBlock";

import classes from "./FreeDialogBlock.module.css";

interface IProps {
  goToFreeDialog: () => void;
}

function FreeDialogBlock({ goToFreeDialog }: IProps) {
  return (
    <CardBlock isBottom className={classes.placeholderContainer}>
      <Placeholder
        className={classes.placeholder}
        icon={<ChatGPTLogo size={60} />}
        header="Задай свой вопрос"
        action={
          <Button
            mode="outline"
            size="m"
            after={<Icon24ArrowRightSquareOutline />}
            onClick={goToFreeDialog}
          >
            Начать диалог
          </Button>
        }
      >
        Взаимодействуй с нейросетью{" "}
        <Link href="https://openai.com/blog/chatgpt" target="_blank">
          Chat GPT
        </Link>{" "}
        в формате чата
      </Placeholder>
    </CardBlock>
  );
}

export default FreeDialogBlock;
