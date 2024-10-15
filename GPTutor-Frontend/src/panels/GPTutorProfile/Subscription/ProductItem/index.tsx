import { Button, Card, Div, Spacing, Title } from "@vkontakte/vkui";
import classes from "$/panels/GPTutorProfile/GPTutorProfile.module.css";
import React from "react";
import { plural } from "$/utility/strings";
import { userInfo } from "$/entity/user/UserInfo";

interface IProps {
  value: number;
  amount: number;
  description: string;
}

function ProductItem({ amount, description, value }: IProps) {
  const formatValue = Intl.NumberFormat("en").format(value);

  return (
    <Card mode="shadow">
      <Div>
        <div className={classes.productTitle}>
          <Title level="2">
            {Intl.NumberFormat("en").format(amount)} Energy ⚡ |{" "}
            {plural(value, [
              `${formatValue} голос`,
              `${formatValue} голоса`,
              `${formatValue} голосов`,
            ])}
          </Title>
          <Button
            size="l"
            style={{
              background: "var(--vkui--color_accent_orange--active)",
              color: "#FF8C00 !important",
            }}
            onClick={() => userInfo.buyBalance(amount)}
          >
            Пополнить баланс
          </Button>
        </div>
        <Spacing size={12} />
        <Card mode="tint">
          <Div>{description}</Div>
        </Card>
      </Div>
    </Card>
  );
}

export default ProductItem;
