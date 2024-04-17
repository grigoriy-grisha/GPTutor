import React from "react";
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

function ModelsForm() {
  const isDisableSubscription = subscriptionsController.isDisable();
  const { goToGPTutorProfile } = useNavigationContext();

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
      {gptModels.models.map((model) => (
        <Card
          className={classNames(classes.containerCard, {
            [classes.containerCardDisable]: isDisableSubscription,
          })}
          mode="shadow"
          key={model.model}
          onClick={() => {
            if (isDisableSubscription) return;
            gptModels.selectModel(model.model);
          }}
        >
          <Div>
            <Card mode="outline-tint">
              <Div className={classes.cardTitle}>
                <Title level="3">{model.model}</Title>
                <Radio
                  name="radio"
                  checked={gptModels.selectedCurrentModel(model.model)}
                />
              </Div>
            </Card>
            <Spacing size={12} />
            <SimpleCell before={<Icon24TreeNodesOutline />}>
              {model.description}
            </SimpleCell>
            <Separator />
            <SimpleCell before={<Icon28HieroglyphCharacterOutline />}>
              {model.lang}
            </SimpleCell>
          </Div>
        </Card>
      ))}
    </Div>
  );
}

export default ModelsForm;
