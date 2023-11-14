import React from "react";
import { Banner, Headline, Image, Title } from "@vkontakte/vkui";

import { vkUser } from "$/entity/user";
import { subscriptionsController } from "$/entity/subscriptions";
import SubscriptionAction from "$/panels/Gallery/Subscription/SubscriptionAction/SubscriptionAction";

function Subscription() {
  return (
    <Banner
      before={<Image src={vkUser.photo_200} size={96} />}
      header={
        <Title level="3">{`${vkUser.first_name} ${vkUser.last_name}`}</Title>
      }
      subheader={
        <div>
          <div>
            Подписка:{" "}
            <Headline style={{ display: "inline" }} level="2" weight="1">
              {subscriptionsController.isDisable() ? "Не активна" : "Активна"}
            </Headline>
          </div>

          {!subscriptionsController.isDisable() && (
            <div>
              Срок подписки до:{" "}
              <Headline style={{ display: "inline" }} level="2" weight="1">
                {subscriptionsController.getExpireDate().toLocaleDateString()}
              </Headline>
            </div>
          )}
        </div>
      }
      actions={
        <div>
          <SubscriptionAction />
        </div>
      }
    />
  );
}

export default Subscription;
