import React from "react";

import {
  Card,
  classNames,
  Div,
  Radio,
  Separator,
  SimpleCell,
  Spacing,
  Title,
} from "@vkontakte/vkui";
import {
  Icon24TreeNodesOutline,
  Icon28HieroglyphCharacterOutline,
  Icon28MoneyCircleOutline,
} from "@vkontakte/icons";

import classes from "$/panels/ChatSettings/ModelsForm/ModelsForm.module.css";
import StatusTag from "../../../../components/StatusTag/StatusTag";

interface IProps {
  className?: string;
  onClick: () => void;
  title: string;
  checked: boolean;
  description: string;
  lang: string;
  disable: boolean;
  amount: number;
}

function ModelCard({
  className,
  onClick,
  title,
  checked,
  description,
  lang,
  disable,
  amount,
}: IProps) {
  return (
    <Card
      className={classNames(
        classes.containerCard,
        { [classes.disable]: disable },
        className
      )}
      mode="shadow"
      onClick={onClick}
    >
      <Div>
        <Card mode="outline-tint">
          <Div className={classes.cardTitle}>
            <div className={classes.title}>
              <Title level="3" style={{ marginRight: 12 }}>
                {title}
              </Title>
              <StatusTag
                status={disable ? 3 : 1}
                text={disable ? "Не активна" : "Активна"}
              />
            </div>
            <Radio name="radio" checked={checked} />
          </Div>
        </Card>
        <Spacing size={12} />
        <SimpleCell before={<Icon24TreeNodesOutline />}>
          {description}
        </SimpleCell>
        <Separator />
        <SimpleCell before={<Icon28HieroglyphCharacterOutline />}>
          {lang}
        </SimpleCell>
        <Separator />
        <SimpleCell before={<Icon28MoneyCircleOutline />}>
          1000 Токенов = {amount} ⚡
        </SimpleCell>
      </Div>
    </Card>
  );
}

export default ModelCard;
