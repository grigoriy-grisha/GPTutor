import React from "react";

import { subscriptionsController } from "$/entity/subscriptions";

function SubscriptionText() {
  return (
    <div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>Отключение задержки!</li>
        <li>Отключение любой рекламы!</li>
        <li>Увеличение контекста в 4 раза!</li>
        <li>Доступ к другим текстовым моделям</li>
        <li>12 голосов!</li>
      </ul>
    </div>
  );
}

export default SubscriptionText;
