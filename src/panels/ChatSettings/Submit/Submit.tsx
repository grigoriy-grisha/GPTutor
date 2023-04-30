import React, { memo } from "react";

import { Button, Div, FixedLayout, Separator } from "@vkontakte/vkui";

import classes from "./Submit.module.css";

interface IProps {
  disabled: boolean;
  onSubmit: () => void;
}

function Submit({ disabled, onSubmit }: IProps) {
  return (
    <FixedLayout vertical="bottom">
      <Separator wide />
      <Div className={classes.submitContainer}>
        <Button
          size="m"
          disabled={disabled}
          style={{ width: "100%" }}
          onClick={onSubmit}
        >
          Сохранить изменния
        </Button>
      </Div>
    </FixedLayout>
  );
}

export default memo(Submit);
