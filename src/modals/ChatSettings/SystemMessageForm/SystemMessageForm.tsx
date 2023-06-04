import React, { memo } from "react";

import { Button, Div, FormItem, Group, Textarea, Title } from "@vkontakte/vkui";

import { AppDiv } from "$/components/AppDiv";

interface IProps {
  isChangedSystemMessage: boolean;
  systemMessageValue: string;
  resetSystemMessage: () => void;
  updateSystemMessage: (value: string) => void;
}

function SystemMessageForm({
  isChangedSystemMessage,
  systemMessageValue,
  resetSystemMessage,
  updateSystemMessage,
}: IProps) {
  return (
    <Group
      mode="plain"
      header={
        <AppDiv>
          <Title level="3">Системное сообщение</Title>
        </AppDiv>
      }
      description="Системное сообщение преднаначено для ChatGPT.
                Оно определяет начальный контекст всего диалога.
                (Писать стихи, музыку, код, рецепты и т.д.)"
    >
      <FormItem>
        <Textarea
          value={systemMessageValue}
          onChange={({ target }) => updateSystemMessage(target.value)}
        />
      </FormItem>
      <Div style={{ paddingTop: 0 }}>
        <Button
          disabled={isChangedSystemMessage}
          mode="outline"
          appearance="negative"
          onClick={resetSystemMessage}
        >
          Сбросить системное сообщение
        </Button>
      </Div>
    </Group>
  );
}

export default memo(SystemMessageForm);
