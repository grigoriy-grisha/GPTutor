import React, { memo } from "react";

import { Platform, usePlatform, WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon24KeyboardBotsOutline,
  Icon28KeyboardBotsOutline,
} from "@vkontakte/icons";
import { LessonRequest } from "$/entity/lessons";
import { IconRenderer } from "$/components/IconRenderer";

interface IProps {
  additionalRequests: LessonRequest[];
  onClickAdditional: () => void;
}

function ChatLessonWriteBarBefore({
  additionalRequests,
  onClickAdditional,
}: IProps) {
  const platform = usePlatform();

  if (!additionalRequests?.length) return null;

  return (
    <WriteBarIcon aria-label="Открыть меню" onClick={onClickAdditional}>
      {
        <IconRenderer
          IconCompact={
            platform === Platform.IOS
              ? Icon28KeyboardBotsOutline
              : Icon24KeyboardBotsOutline
          }
          IconRegular={Icon28KeyboardBotsOutline}
        />
      }
    </WriteBarIcon>
  );
}

export default memo(ChatLessonWriteBarBefore);
