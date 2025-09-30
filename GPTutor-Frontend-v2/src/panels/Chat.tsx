import { FC, useState } from "react";
import {
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  Placeholder,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";
import { Icon28MessageOutline } from "@vkontakte/icons";

export interface ChatProps extends NavIdProps {}

export const Chat: FC<ChatProps> = ({ id }) => {
  const [message, setMessage] = useState("");

  return (
    <Panel id={id}>
      <PanelHeader>Чат</PanelHeader>
      
      <Group>
        <Placeholder
          icon={<Icon28MessageOutline width={56} height={56} />}
        >
          Начните диалог
          <br />
          Отправьте сообщение, чтобы начать общение с ИИ-ассистентом
        </Placeholder>
      </Group>

      <div style={{ 
        position: "fixed", 
        bottom: 0, 
        left: 0, 
        right: 0, 
        background: "var(--vkui--color_background)",
        borderTop: "1px solid var(--vkui--color_separator_primary)"
      }}>
        <WriteBar
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          after={
            <WriteBarIcon 
              mode="send" 
              onClick={() => {
                if (message.trim()) {
                  // Здесь будет логика отправки сообщения
                  console.log("Отправка сообщения:", message);
                  setMessage("");
                }
              }}
            />
          }
          placeholder="Введите сообщение..."
        />
      </div>
    </Panel>
  );
};
