import React, { memo } from "react";

import { Platform, usePlatform, WriteBarIcon } from "@vkontakte/vkui";
import {
  Icon24KeyboardBotsOutline,
  Icon28KeyboardBotsOutline,
  Icon28SettingsOutline,
} from "@vkontakte/icons";
import { LessonRequest } from "$/entity/lessons";
import { IconRenderer } from "$/components/IconRenderer";

interface IProps {
  additionalRequests: LessonRequest[];
  onClickAdditional: () => void;
  onSettingsClick: () => void;
}
function WriteBarBefore({
  additionalRequests,
  onClickAdditional,
  onSettingsClick,
}: IProps) {
  const platform = usePlatform();

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
    <>
      {!additionalRequests?.length && (
        <WriteBarIcon onClick={onSettingsClick}>
          <Icon28SettingsOutline />
        </WriteBarIcon>
      )}
      {!!additionalRequests?.length && (
        <WriteBarIcon aria-label="Открыть меню" onClick={onClickAdditional}>
          {KeyboardBotsOutlineIcon}
        </WriteBarIcon>
      )}
    </>
  );
}

export default memo(WriteBarBefore);
