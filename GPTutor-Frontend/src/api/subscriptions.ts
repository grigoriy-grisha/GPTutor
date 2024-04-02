import { Subscription } from "$/entity/subscriptions/types";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;
export async function getSubscription(
  subscriptionName: string
): Promise<Subscription> {
  const response = await fetch(
    `${BACKEND_HOST}purchase/subscription/${subscriptionName}`,
    {
      headers: {
        Authorization: "Bearer " + location.href,
      },
    }
  );
  return response.json();
}

export async function updateSubscription(
  subscriptionName: string
): Promise<Subscription> {
  const response = await fetch(
    `${BACKEND_HOST}purchase/update-subscriptions/${subscriptionName}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + location.href,
      },
    }
  );
  return response.json();
}
