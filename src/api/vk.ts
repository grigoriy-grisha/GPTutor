import { GroupsIsMemberRequest } from "$/entity/vk";

export async function groupsIsMember({
  groupId,
  userId,
}: GroupsIsMemberRequest) {
  const accessToken =
    "1267bc731267bc731267bc73b21174dfe4112671267bc73764d324056fbb15ed217eeab"; // Токен доступа
  const apiUrl = `https://api.vk.com/method/groups.isMember?group_id=${groupId}&user_id=${userId}&access_token=${accessToken}&v=5.131`;
  const response = await fetch(apiUrl);
  return await response.json();
}
