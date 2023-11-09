import { GroupsIsMemberRequest } from "$/entity/vk";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

export async function groupsIsMember({
  groupId,
  userId,
}: GroupsIsMemberRequest) {
  const response = await fetch(
    `${BACKEND_HOST}groups-is-member?groupId=${groupId}&userId=${userId}`,
    {
      headers: {
        Authorization: "Bearer " + location.href,
      },
    }
  );

  return await response.json();
}

export async function uploadPhoto(uploadUrl: string, imageUrl: string) {
  const response = await fetch(`${BACKEND_HOST}upload-photo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + location.href,
    },
    body: JSON.stringify({ uploadUrl, imageUrl }),
  });

  return await response.json();
}
