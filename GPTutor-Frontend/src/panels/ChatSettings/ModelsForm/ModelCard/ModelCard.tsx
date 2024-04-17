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
} from "@vkontakte/icons";

import classes from "$/panels/ChatSettings/ModelsForm/ModelsForm.module.css";

interface IProps {
  className?: string;
  onClick: () => void;
  title: string;
  checked: boolean;
  description: string;
  lang: string;
}

function ModelCard({
  className,
  onClick,
  title,
  checked,
  description,
  lang,
}: IProps) {
  return (
    <Card
      className={classNames(classes.containerCard, className)}
      mode="shadow"
      onClick={onClick}
    >
      <Div>
        <Card mode="outline-tint">
          <Div className={classes.cardTitle}>
            <Title level="3">{title}</Title>
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
      </Div>
    </Card>
  );
}

export default ModelCard;
