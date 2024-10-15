import React, { useEffect } from "react";
import {
  Button,
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
  Icon24LockOpenOutline,
  Icon24TreeNodesOutline,
  Icon28FireCircleFillRed,
  Icon28HieroglyphCharacterOutline,
} from "@vkontakte/icons";

import classes from "./ModelsForm.module.css";
import { gptModels } from "$/entity/GPT/GptModels";
import { subscriptionsController } from "$/entity/subscriptions";
import { useNavigationContext } from "$/NavigationContext";
import { ModelCard } from "$/panels/ChatSettings/ModelsForm/ModelCard";
import { appService } from "$/services/AppService";

function ModelsForm() {
  return (
    <Div className={classes.container}>
      <Title Component="h1">Модели ✨</Title>
      {gptModels.tgModels.map((model) => (
        <ModelCard
          disable={!model.active}
          key={model.model}
          title={model.model}
          amount={model.amount}
          description={model.description}
          checked={gptModels.selectedCurrentModel(model.model)}
          lang={model.lang}
          onClick={() => gptModels.selectModel(model.model)}
        />
      ))}
    </Div>
  );
}

export default ModelsForm;
