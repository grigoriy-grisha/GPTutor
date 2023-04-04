import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Avatar,
  Button,
  Div,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Paragraph,
  Platform,
  Separator,
  SimpleCell,
  Text,
  useAdaptivityConditionalRender,
  useConfigProvider,
  usePlatform,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";
import {
  Icon12OnlineMobile,
  Icon24KeyboardBotsOutline,
  Icon28KeyboardBotsOutline,
} from "@vkontakte/icons";
import { ChatGPTLogo } from "../icons";
import { lessonsController } from "../entity/lessons";
import IsTypingLoader from "../components/IsTypingLoader/IsTypingLoader";

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

const IconRenderer = ({ IconCompact, IconRegular }) => {
  const { sizeY } = useAdaptivityConditionalRender();

  return (
    <React.Fragment>
      {sizeY.compact && <IconCompact className={sizeY.compact.className} />}
      {sizeY.regular && <IconRegular className={sizeY.regular.className} />}
    </React.Fragment>
  );
};

const Main = ({ id, user }) => {
  const chatScrollRef = useRef();
  const [isAdditionalOpen, setAdditionalsOpen] = useState(true);
  const [headerElem, setHeaderElem] = useState();
  const firstLesson = lessonsController.lessons[0];
  const [value, setValue] = useState("");

  const platform = usePlatform();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const { appearance } = useConfigProvider();
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  useEffect(() => {
    console.log(chatScrollRef);
    // handleSend("Объясни функции в js");
    handleSend(firstLesson.initialRequest.text);
  }, []);

  const KeyboardBotsOutlineIcon = (
    <IconRenderer
      IconCompact={
        platform === Platform.IOS
          ? Icon28KeyboardBotsOutline
          : Icon24KeyboardBotsOutline
      }
      IconRegular={Icon28KeyboardBotsOutline}
    />
  );

  return (
    <Panel id={id}>
      <div ref={setHeaderElem}>
        <PanelHeader before={<PanelHeaderBack />}>
          <SimpleCell
            disabled
            before={
              <Avatar
                size={24}
                fallbackIcon={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ChatGPTLogo />
                  </div>
                }
              />
            }
            subtitle={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 6,
                }}
              >
                {isTyping ? (
                  <>
                    <IsTypingLoader />
                    Печатает
                  </>
                ) : (
                  <>
                    онлайн
                    <Icon12OnlineMobile
                      style={{
                        color: "var(--vkui--color_text_positive--active)",
                      }}
                    />
                  </>
                )}
              </div>
            }
          >
            <Text weight="1">Чат ГПТ</Text>
          </SimpleCell>
        </PanelHeader>
      </div>

      <div
        style={{
          background: "var(--vkui--color_background_content)",
          height: `calc(100vh - ${headerElem?.offsetHeight}px)`,
          maxHeight: `calc(100vh - ${headerElem?.offsetHeight}px)`,
          position: "relative",
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "hidden",
        }}
      >
        <div
          ref={chatScrollRef}
          style={{
            order: "1",
            zIndex: "1",
            flexGrow: "1",
            flexBasis: "65%",
            overflow: "auto",
          }}
        >
          <Div
            style={{
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
              minHeight: "1.25em",
              background: "var(--vkui--color_background_content)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {messages.map((message, i) => {
                return (
                  <div style={{ display: "flex", gap: 12, paddingBottom: 12 }}>
                    {message.sender === "ChatGPT" ? (
                      <Avatar
                        size={36}
                        fallbackIcon={<ChatGPTLogo />}
                        src="#"
                      />
                    ) : (
                      <Avatar
                        size={36}
                        fallbackIcon={null}
                        src={user?.photo_100}
                      />
                    )}
                    <div style={{ display: "grid" }}>
                      <Text weight="2">
                        {message.sender === "ChatGPT"
                          ? "Чат ГПТ"
                          : user?.first_name}
                      </Text>
                      <Paragraph
                        weight="3"
                        style={{
                          marginTop: -12,
                        }}
                      >
                        <ReactMarkdown
                          disallowedElements={["paragraph"]}
                          components={{
                            p: (props) => (
                              <span className="paragraph" {...props} />
                            ),
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              const isOneOperand =
                                children[0].split(" ").length === 1;

                              return (
                                <SyntaxHighlighter
                                  className={
                                    isOneOperand ? "isOneOperand" : undefined
                                  }
                                  style={
                                    appearance === "dark" ? oneDark : oneLight
                                  }
                                  children={String(children).replace(/\n$/, "")}
                                  language="js"
                                  {...props}
                                />
                              );
                            },
                          }}
                        >
                          {message.message}
                        </ReactMarkdown>
                      </Paragraph>
                    </div>
                  </div>
                );
              })}
            </div>
          </Div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            flexShrink: "0",
          }}
        >
          <div style={{ width: "100%" }}>
            {isAdditionalOpen && (
              <>
                <Separator wide />
                <Div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    background: "var(--vkui--color_background_content)",
                  }}
                >
                  {firstLesson.additionalRequests.map((request) => (
                    <Button
                      disabled={isTyping}
                      mode={request.isSelected ? "outline" : "primary"}
                      size="m"
                      onClick={() => {
                        handleSend(request.text);
                        request.select();
                      }}
                    >
                      {request.name}
                    </Button>
                  ))}
                </Div>
              </>
            )}
            <Separator wide />
            <WriteBar
              value={value}
              onChange={(e) => setValue(e.target.value)}
              before={
                <WriteBarIcon
                  aria-label="Открыть меню бота"
                  onClick={() => setAdditionalsOpen(!isAdditionalOpen)}
                >
                  {KeyboardBotsOutlineIcon}
                </WriteBarIcon>
              }
              after={
                <>
                  <WriteBarIcon
                    mode="send"
                    disabled={value.length === 0 || isTyping}
                    onClick={() => {
                      handleSend(value);
                      setValue("");
                    }}
                  />
                </>
              }
              placeholder="Сообщение"
            />
          </div>
        </div>
      </div>
    </Panel>
  );
};

Main.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Main;
