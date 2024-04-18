import { Button, Card, FormItem, Input, Spacing } from "@vkontakte/vkui";
import { AppDiv } from "$/components/AppDiv";
import classes from "$/panels/AdditionalRequests/AdditionalRequest.module.css";
import { SelectButton } from "$/components/SelectButton";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { additionalRequests } from "$/entity/additionalRequest/AdditionalRequests";
import React from "react";
import useDebounce from "$/hooks/useDebounce";
import { AdditionalRequestItem } from "$/entity/additionalRequest/AdditionalRequestItem";

interface IProps {
  request: AdditionalRequestItem;
}

function AdditionalRequest({ request }: IProps) {
  const updateAdditionalRequest = useDebounce(
    additionalRequests.updateAdditionalRequest
  );

  return (
    <Card mode="shadow">
      <FormItem top="Сообщение">
        <Input
          placeholder="Сообщение"
          value={request.message$.get()}
          onChange={(event) => {
            request.message$.set(event.target.value);
            updateAdditionalRequest(request);
          }}
        />
      </FormItem>
      <FormItem top="Название">
        <Input
          placeholder="Название"
          value={request.title$.get()}
          onChange={(event) => {
            request.title$.set(event.target.value);
            updateAdditionalRequest(request);
          }}
        />
      </FormItem>
      <Spacing size={6} />
      <AppDiv className={classes.createTop}>
        <SelectButton
          selectedMode="primary"
          defaultMode="outline"
          onClick={() => {
            request.toggleDisable();
            updateAdditionalRequest(request);
          }}
          selected={request.isActive$.get()}
        >
          {request.isActive$.get() ? "Включен" : "Выключен"}
        </SelectButton>
        <Button
          disabled={additionalRequests.requests$.get().size <= 1}
          size="m"
          mode="outline"
          appearance="negative"
          after={<Icon24DeleteOutline />}
          onClick={() => additionalRequests.deleteRequest(request)}
        >
          Удалить
        </Button>
      </AppDiv>
      <Spacing size={12} />
    </Card>
  );
}

export default AdditionalRequest;
