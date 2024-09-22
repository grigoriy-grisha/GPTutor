import { GroupsIsMemberRequest } from "$/entity/vk";
import { OrderSubscriptionResponseData } from "$/entity/subscriptions/types";
import { httpService } from "$/services/HttpService";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export async function groupsIsMember({
  groupId,
  userId,
}: GroupsIsMemberRequest) {
  const response = await fetch(
    `${BACKEND_HOST}vk/groups-is-member?groupId=${groupId}&userId=${userId}`,
    {
      headers: {
        Authorization: httpService.authorization,
      },
    }
  );

  return await response.json();
}

export async function getUserSubscriptions(): Promise<OrderSubscriptionResponseData> {
  const response = await fetch(`${BACKEND_HOST}vk/user-subscriptions`, {
    headers: {
      Authorization: httpService.authorization,
    },
  });

  return await response.json();
}

export async function uploadPhoto(uploadUrl: string, imageId: string) {
  const response = await fetch(`${BACKEND_HOST}vk/upload-photo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: httpService.authorization,
    },
    body: JSON.stringify({ uploadUrl, imageId }),
  });

  return await response.json();
}

export async function uploadPhotoUrl(uploadUrl: string, url: string) {
  const response = await fetch(`${BACKEND_HOST}vk/upload-photo-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: httpService.authorization,
    },
    body: JSON.stringify({ uploadUrl, url }),
  });

  return await response.json();
}

export type WallPostGroupParams = {
  message: string;
  attachments: string;
  ownerId: number;
  groupId: number;
};
export async function wallPostGroup(params: WallPostGroupParams) {
  const response = await fetch(`${BACKEND_HOST}vk/wall-post-group`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: httpService.authorization,
    },
    body: JSON.stringify(params),
  });

  return await response.json();
}
