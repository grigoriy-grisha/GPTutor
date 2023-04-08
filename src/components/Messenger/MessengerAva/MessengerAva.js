import React, { memo } from "react";

import { Avatar } from "@vkontakte/vkui";

import { ChatGPTLogo } from "../../../icons";

function MessengerAva({ message, photo }) {
  return (
    <>
      {message.role === "assistant" ? (
        <Avatar size={36} fallbackIcon={<ChatGPTLogo />} />
      ) : (
        <Avatar size={36} fallbackIcon={null} src={photo} />
      )}
    </>
  );
}

export default memo(MessengerAva);
