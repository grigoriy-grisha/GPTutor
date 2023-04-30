import React, { memo } from "react";

import { Avatar } from "@vkontakte/vkui";

import { ChatGPTLogo } from "$/icons";
import { GptMessage } from "$/entity/GPT";

interface IProps {
  message: GptMessage;
  photo: string;
}

function MessengerAva({ message, photo }: IProps) {
  return (
    <>
      {message.role === "assistant" ? (
        <Avatar size={34} fallbackIcon={<ChatGPTLogo />} />
      ) : (
        <Avatar size={36} fallbackIcon={<></>} src={photo} />
      )}
    </>
  );
}

export default memo(MessengerAva);
