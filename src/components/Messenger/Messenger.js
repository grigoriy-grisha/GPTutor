import React, { memo, useEffect, useState } from "react";
import Header from "./Header/Header";
import { MainContainer } from "../MainContainer";
import { MessengerContainer } from "./MessengerContainer";
import { MessengerList } from "./MessengerList";
import MessengerWriteBar from "./MessengerWriteBar/MessengerWriteBar";

const API_KEY = "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";

const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 10 years of experience and teach junior",
};

function Messenger({ goBack, user, lesson }) {
  const [headerElem, setHeaderElem] = useState();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
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
      temperature: 0,
      max_tokens: 7,
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

  const onStartChat = () => {
    handleSend("Привет!, что ты можешь?");
  };

  useEffect(() => {
    if (lesson?.initialRequest) {
      handleSend(lesson.initialRequest.text);
    }
  }, []);

  return (
    <>
      <div ref={setHeaderElem}>
        <Header goBack={goBack} isTyping={isTyping} />
      </div>
      <MainContainer
        style={{ flexDirection: "column-reverse" }}
        offsetHeight={headerElem?.offsetHeight}
      >
        <MessengerContainer>
          <MessengerList
            messages={messages}
            user={user}
            onStartChat={onStartChat}
          />
        </MessengerContainer>
        <MessengerWriteBar
          additionalRequests={lesson?.additionalRequests}
          handleSend={handleSend}
          isTyping={isTyping}
        />
      </MainContainer>
    </>
  );
}

export default memo(Messenger);
