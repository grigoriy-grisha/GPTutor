import { GroupsIsMemberRequest } from "$/entity/vk";

const BACKEND_HOST = _env_.REACT_APP_BACKEND_HOST;

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
