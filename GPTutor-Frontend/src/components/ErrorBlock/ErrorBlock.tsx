import React from "react";

import { Placeholder } from "@vkontakte/vkui";
import { Icon56ErrorOutline } from "@vkontakte/icons";
function ErrorBlock() {
  return (
    <Placeholder
      style={{ paddingTop: 50 }}
      icon={<Icon56ErrorOutline />}
      header="Произошла ошибка"
    >
      Произошла ошибка при получении данных
    </Placeholder>
  );
}

export default ErrorBlock;
