import React from "react";
import {
  Card,
  Div,
  Headline,
  Image,
  Link,
  Placeholder,
  Spacing,
  Title,
} from "@vkontakte/vkui";

import { vkUser } from "$/entity/user";

import classes from "../GPTutorProfile.module.css";
import { userInfo } from "$/entity/user/UserInfo";
import ProductItem from "$/panels/GPTutorProfile/Subscription/ProductItem";
import { appService } from "$/services/AppService";
import { subscriptionsController } from "$/entity/subscriptions";
import { Icon32DonutCircleFillYellow } from "@vkontakte/icons";
import { SubscriptionAction } from "$/panels/GPTutorProfile/Subscription/SubscriptionAction";
import { SubscriptionText } from "$/panels/Profile/Subscription/SubscriptionText";

function Subscription() {
  const expireDate = subscriptionsController.getExpireDate();

  return (
    <Div style={{ width: "100vw" }}>
      <Card mode="shadow">
        <Div className={classes.cardContainer}>
          {appService.isVK() && <Image src={vkUser.photo_200} size={96} />}

          <div className={classes.cardText}>
            <Title
              className={classes.cardName}
              level="3"
              Component="h3"
            >{`${vkUser.first_name} ${vkUser.last_name}`}</Title>
            <div className={classes.subtitleText}>
              <div>
                Ваш баланс:{" "}
                <Headline
                  style={{ display: "inline" }}
                  level="1"
                  weight="1"
                  Component="h4"
                >
                  {Intl.NumberFormat("en").format(userInfo.balance.get())} ⚡
                </Headline>
              </div>
              <div>
                Баланс автоматически пополняется раз в сутки на 10,000 ⚡
              </div>
            </div>
          </div>
        </Div>
      </Card>
      <Spacing size={12} />
      <Card mode="shadow">
        <Div>
          <Title className={classes.cardName} level="2">
            Хочешь скидку 50%?{" "}
            <Link href="https://t.me/+VMrsvzEcp2czOWJi" target="_blank">
              Напишите нам в ТГ! ⚡⚡⚡
            </Link>
          </Title>
        </Div>
      </Card>
      {!appService.isTG() && (
        <>
          <Spacing size={12} />
          <Title Component="h1">Пополнение баланса ⚡</Title>
          <Spacing size={12} />
          <div className={classes.productContainer}>
            <ProductItem
              description=" Хватит на 2-3 недели использования недорогих моделей: gpt-4o-mini, claude-3-haiku, Llama-3.1."
              amount={100000}
              value={30}
            />
            <ProductItem
              description="Хватит на 2-3 недели использования средних моделей: o1-mini, gpt-4o, claude-3.5-sonnet"
              amount={200000}
              value={60}
            />
            <ProductItem
              description="Хватит на несколько месяцев использования недорогих моделей: gpt-4o-mini, claude-3-haiku, Llama-3.1."
              amount={400000}
              value={120}
            />
            <ProductItem
              description="Хватит на несколько месяцев использования средних моделей: o1-mini, gpt-4o, claude-3.5-sonnet"
              amount={1000000}
              value={300}
            />
            <ProductItem
              description="Хватит на месяц использования самых мощных и дорогих моделей: o1-preview, claude-3-opus"
              amount={5000000}
              value={1500}
            />
          </div>
        </>
      )}
    </Div>
  );
}

export default Subscription;
