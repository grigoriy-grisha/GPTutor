import React from "react";
import {
  Banner,
  Card,
  Div,
  Headline,
  Image,
  Placeholder,
  Spacing,
  Title,
} from "@vkontakte/vkui";

import { vkUser } from "$/entity/user";
import { subscriptionsController } from "$/entity/subscriptions";

import SubscriptionAction from "$/panels/Profile/Subscription/SubscriptionAction/SubscriptionAction";
import { AppDiv } from "$/components/AppDiv";

import classes from "../Profile.module.css";
import { Icon32DonutCircleFillYellow } from "@vkontakte/icons";
import { SubscriptionText } from "$/panels/Profile/Subscription/SubscriptionText";

function Subscription() {
  const expireDate = subscriptionsController.getExpireDate();

  return (
    <Div style={{ width: "100vw" }}>
      <Card mode="shadow">
        <Div className={classes.cardContainer}>
          <Image src={vkUser.photo_200} size={96} />
          <div className={classes.cardText}>
            <Title level="3" Component="h3">{`${vkUser.first_name} ${vkUser.last_name}`}</Title>
            <div className={classes.subtitleText}>
              <div>
                Подписка:{" "}
                <Headline style={{ display: "inline" }} level="2" weight="1" Component="h4">
                  {subscriptionsController.isDisable()
                    ? "Не активна"
                    : "Активна"}
                </Headline>
              </div>
              {!subscriptionsController.isDisable() && (
                <div>
                  Срок подписки до:{" "}
                  <Headline style={{ display: "inline" }} level="2" weight="1" Component="h4">
                    {expireDate?.toLocaleDateString()}
                  </Headline>
                </div>
              )}
            </div>
          </div>
        </Div>
      </Card>
      <Spacing size={12} />
      <Card mode="shadow">
        <Div>
          <Placeholder
            icon={<Icon32DonutCircleFillYellow width={56} height={56} />}
            header="Творите без границ!"
            action={<SubscriptionAction />}
          >
            <SubscriptionText />
          </Placeholder>
        </Div>
      </Card>
    </Div>
  );
}

export default Subscription;
