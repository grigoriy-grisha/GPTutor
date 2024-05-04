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

function ModelsForm() {
  const isDisableSubscription = subscriptionsController.isDisable();
  const { goToGPTutorProfile } = useNavigationContext();

  useEffect(() => {
    gptModels.loadModels();
  }, []);
  return (
    <Div className={classes.container}>
      {isDisableSubscription && (
        <Card
          className={classes.containerCard}
          mode="shadow"
          onClick={goToGPTutorProfile}
        >
          <Div>
            <Card mode="outline-tint">
              <Div className={classes.cardTitle}>
                <Button
                  size="m"
                  before={<Icon24LockOpenOutline />}
                  style={{
                    width: "100%",
                    background: "var(--vkui--color_accent_orange--active)",
                    color: "#FF8C00 !important",
                  }}
                >
                  Получить подписку
                </Button>
              </Div>
            </Card>
            <Spacing size={12} />
            <SimpleCell before={<Icon28FireCircleFillRed />}>
              Разблокируйте все модели! 🤩🤩
            </SimpleCell>
          </Div>
        </Card>
      )}
      <Title Component="h1">Бесплатные модели ✨</Title>
      {gptModels.freeModels.map((model) => (
        <ModelCard
          key={model.model}
          title={model.model}
          description={model.description}
          checked={gptModels.selectedCurrentModel(model.model)}
          lang={model.lang}
          onClick={() => gptModels.selectModel(model.model)}
        />
      ))}
      <Title Component="h1">Модели по подписке 🔥</Title>
      {gptModels.models.map((model) => (
        <ModelCard
          key={model.model}
          title={model.model}
          description={model.description}
          checked={gptModels.selectedCurrentModel(model.model)}
          lang={model.lang}
          onClick={() => {
            if (isDisableSubscription) return;
            gptModels.selectModel(model.model);
          }}
          className={classNames({
            [classes.containerCardDisable]: isDisableSubscription,
          })}
        />
      ))}
    </Div>
  );
}

export default ModelsForm;
