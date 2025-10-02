import { FC, useState, useRef, useEffect } from "react";
import {
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  Placeholder,
  WriteBar,
  WriteBarIcon,
  Div,
  Text,
  Avatar,
  Spinner,
} from "@vkontakte/vkui";
import { Icon28MessageOutline, Icon28SendOutline, Icon28RobotOutline } from "@vkontakte/icons";
import { chatApi, ChatMessage, profileApi } from "../../api";
import Markdown from "../../services/Markdown";
import styles from "./Chat.module.css";

export interface ChatProps extends NavIdProps {}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chat: FC<ChatProps> = ({ id }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const markdown = new Markdown();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Загружаем API ключ и профиль при инициализации
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileApi.getProfile();
        setApiKey(response.user.apiKey);
        setUserProfile(response);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    loadProfile();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message.trim();
    setMessage("");
    setIsLoading(true);

    try {
      // Подготавливаем сообщения для API
      const apiMessages: ChatMessage[] = [
        ...messages.map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.text
        })),
        {
          role: 'user' as const,
          content: currentMessage
        }
      ];

      // Создаем сообщение ИИ с пустым текстом для streaming
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        text: '',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Отправляем streaming запрос к API
      const stream = chatApi.sendMessageStream(apiKey, {
        model: 'google/gemini-2.5-flash-lite',
        messages: apiMessages,
        max_tokens: 1000,
        temperature: 0.7
      });

      // Обрабатываем streaming ответ
      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, text: msg.text + content }
                : msg
            )
          );
          scrollToBottom();
        }
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      
      // Добавляем сообщение об ошибке
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Извините, произошла ошибка при отправке сообщения. Попробуйте еще раз.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Panel id={id} className={styles.chatPanel}>
      <PanelHeader>Чат</PanelHeader>
      
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
            <Group>
              <Placeholder
                icon={<Icon28MessageOutline width={56} height={56} />}
              >
                Начните диалог
                <br />
                Отправьте сообщение, чтобы начать общение с ИИ-ассистентом
              </Placeholder>
            </Group>
        ) : (
          <Group>
            {messages.map((msg) => (
              <Div 
                key={msg.id} 
                className={`${styles.messageContainer} ${msg.isUser ? styles.messageContainerUser : styles.messageContainerAI}`}
              >
                <div className={`${styles.messageInner} ${msg.isUser ? styles.messageInnerUser : styles.messageInnerAI}`}>
                  {msg.isUser ? (
                    <Avatar 
                      size={32} 
                      src={userProfile?.vkData?.photo_200} 
                      fallbackIcon={<Icon28MessageOutline />}
                    />
                  ) : (
                    <Avatar 
                      size={32} 
                      fallbackIcon={<Icon28RobotOutline />}
                    />
                  )}
                  <div className={styles.messageContent}>
                    <div className={`${styles.userName} ${msg.isUser ? styles.userNameUser : styles.userNameAI}`}>
                      {msg.isUser ? 'Пользователь' : 'Бот API'}
                    </div>
                    <div className={`${styles.messageBubble} ${msg.isUser ? styles.messageBubbleUser : styles.messageBubbleAI}`}>
                    {msg.isUser ? (
                      <Text style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>{msg.text}</Text>
                    ) : (
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: markdown.render(msg.text) 
                        }}
                        style={{ 
                          color: 'inherit',
                          fontSize: 'inherit',
                          lineHeight: 'inherit'
                        }}
                      />
                    )}
                    </div>
                  </div>
                </div>
              </Div>
            ))}
            {isLoading && (
              <Div className={styles.loadingContainer}>
                <div className={styles.loadingInner}>
                  <Avatar 
                    size={32} 
                    fallbackIcon={<Icon28RobotOutline />}
                  />
                  <Spinner size="s" />
                </div>
              </Div>
            )}
            <div ref={messagesEndRef} />
          </Group>
        )}
      </div>

      <div className={styles.inputContainer}>
        <WriteBar
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          after={
            <WriteBarIcon 
              mode="send" 
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
            >
              <Icon28SendOutline />
            </WriteBarIcon>
          }
          placeholder="Введите сообщение..."
          disabled={isLoading}
        />
      </div>
    </Panel>
  );
};
