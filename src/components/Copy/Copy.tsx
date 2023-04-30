import React, { memo, useMemo } from "react";

import { CopyService } from "$/services/CopyService";
import CopyAction from "$/components/Copy/CopyAction";
import CopySnackBar from "$/components/Copy/CopySnackBar";

interface IProps {
  mode?: "primary" | "secondary" | "tertiary" | "outline" | "link";
  copyText?: string;
  isButton?: boolean;
  className?: string;
  textToClickBoard: string;
  onAfterClickBoard?: () => void;
}

function Copy({
  mode,
  copyText,
  isButton,
  className,
  textToClickBoard,
  onAfterClickBoard,
}: IProps) {
  const copyService = useMemo(() => new CopyService(), []);

  function copyToClickBoard(text: string) {
    copyService.copyToClickBoard$.run(text).then(() => onAfterClickBoard?.());
  }

  const onClick = () => copyToClickBoard(textToClickBoard);

  return (
    <>
      <CopyAction
        copyText={copyText}
        onClick={onClick}
        className={className}
        isButton={isButton}
        mode={mode}
      />
      <CopySnackBar copyService={copyService} />
    </>
  );
}

export default memo(Copy);
