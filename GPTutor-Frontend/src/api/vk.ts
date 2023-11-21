import { GroupsIsMemberRequest } from "$/entity/vk";
import { OrderSubscriptionResponseData } from "$/entity/subscriptions/types";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export async function groupsIsMember({
  groupId,
  userId,
}: GroupsIsMemberRequest) {
  const response = await fetch(
    `${BACKEND_HOST}vk/groups-is-member?groupId=${groupId}&userId=${userId}`,
    {
      headers: {
        Authorization: "Bearer " + location.href,
      },
    }
  );

  return await response.json();
}

export async function getUserSubscriptions(): Promise<OrderSubscriptionResponseData> {
  const response = await fetch(`${BACKEND_HOST}vk/user-subscriptions`, {
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });

  return await response.json();
}

export async function uploadPhoto(uploadUrl: string, imageBase64: string) {
  const response = await fetch(`${BACKEND_HOST}vk/upload-photo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + location.href,
    },
    body: JSON.stringify({ uploadUrl, imageBase64 }),
  });

  return await response.json();
}
