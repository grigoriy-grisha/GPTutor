import React, { memo } from "react";

import { Avatar } from "@vkontakte/vkui";

import { ChatGPTLogo } from "../../../icons";
import { GPTMessage } from "../../../entity/GPT/types";

interface IProps {
  message: GPTMessage;
  photo: string;
}

function MessengerAva({ message, photo }: IProps) {
  return (
    <>
      {message.role === "assistant" ? (
        <Avatar size={36} fallbackIcon={<ChatGPTLogo />} />
      ) : (
        <Avatar size={36} fallbackIcon={<></>} src={photo} />
      )}
    </>
  );
}

export default memo(MessengerAva);
