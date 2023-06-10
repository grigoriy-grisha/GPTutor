import { GroupsIsMemberRequest } from "$/entity/vk";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || "/api/";

export async function groupsIsMember({
  groupId,
  userId,
}: GroupsIsMemberRequest) {
  const response = await fetch(
    `${BACKEND_HOST}groups.isMember?groupId=${groupId}&userId=${userId}`
  );
  return await response.json();
}
