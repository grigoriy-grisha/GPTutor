import React from "react";
import {
  Banner,
  Card,
  Div,
  Headline,
  Image,
  Link,
  Placeholder,
  Spacing,
  Title,
} from "@vkontakte/vkui";
import { Icon32DonutCircleFillYellow } from "@vkontakte/icons";

import { vkUser } from "$/entity/user";
import { subscriptionsController } from "$/entity/subscriptions";

import { SubscriptionAction } from "./SubscriptionAction";
import { SubscriptionText } from "./SubscriptionText";

import classes from "../GPTutorProfile.module.css";

function Subscription() {
  const expireDate = subscriptionsController.getExpireDate();

  return (
    <Div style={{ width: "100vw" }}>
      <Card mode="shadow">
        <Div className={classes.cardContainer}>
          <Image src={vkUser.photo_200} size={96} />
          <div className={classes.cardText}>
            <Title
              className={classes.cardName}
              level="3"
              Component="h3"
            >{`${vkUser.first_name} ${vkUser.last_name}`}</Title>
            <div className={classes.subtitleText}>
              <div>
                Подписка:{" "}
                <Headline
                  style={{ display: "inline" }}
                  level="2"
                  weight="1"
                  Component="h4"
                >
                  {subscriptionsController.isDisable()
                    ? "Неактивна"
                    : "Активна"}
                </Headline>
              </div>
              {!subscriptionsController.isDisable() && (
                <div>
                  Срок подписки до:{" "}
                  <Headline
                    style={{ display: "inline" }}
                    level="2"
                    weight="1"
                    Component="h4"
                  >
                    {expireDate?.toLocaleDateString()}
                  </Headline>
                </div>
              )}
              <div>
                <Link
                  target="_blank"
                  href="https://vk.com/settings?act=payments&section=subscriptions"
                >
                  Управление подписками
                </Link>
              </div>
            </div>
          </div>
        </Div>
      </Card>
      <Spacing size={12} />
      <Card mode="shadow">
        <Div>
          <Placeholder
            icon={<Icon32DonutCircleFillYellow width={56} height={56} />}
            header="Пользуйтесь без ограничений!"
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
