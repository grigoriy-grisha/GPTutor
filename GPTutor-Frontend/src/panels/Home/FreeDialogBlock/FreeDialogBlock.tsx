import React from "react";

import { Button, Placeholder } from "@vkontakte/vkui";
import { Icon24ArrowRightSquareOutline } from "@vkontakte/icons";

import { ChatGPTLogo } from "$/icons";
import { CardBlock } from "$/components/CardBlock";

import classes from "./FreeDialogBlock.module.css";
import { useNavigationContext } from "$/NavigationContext";

interface IProps {
  goToFreeDialog: () => void;
}

function FreeDialogBlock({ goToFreeDialog }: IProps) {
  const { goToBingPanel } = useNavigationContext();

  return (
    <CardBlock isBottom className={classes.placeholderContainer}>
      <Placeholder
        className={classes.placeholder}
        icon={<ChatGPTLogo size={60} />}
        header="Задай свой вопрос"
        action={
          <div className={classes.actions}>
            <Button
              mode="outline"
              size="m"
              after={<Icon24ArrowRightSquareOutline />}
              onClick={goToFreeDialog}
            >
              Начать диалог GPT
            </Button>
          </div>
        }
      >
        Взаимодействуй с Чат-ботом в формате диалога
      </Placeholder>
    </CardBlock>
  );
}

export default FreeDialogBlock;
