import React from "react";

import { subscriptionsController } from "$/entity/subscriptions";

function SubscriptionText() {
  return (
    <div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>Генерируйте сразу 4 фотографии от 10 секунд!</li>
        <li>Настраивайте размеры фотографий!</li>
        <li>Отключение любой рекламы!</li>
        <li>12 голосов!</li>
      </ul>
    </div>
  );
}

export default SubscriptionText;
