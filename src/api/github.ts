import { IssueType, RepositoryType } from "$/entity/Github";

export async function getIssues(): Promise<IssueType[]> {
  return await fetch(
    "https://api.github.com/repos/grigoriy-grisha/ChatGPT-vk-mini-app/issues"
  ).then((data) => data.json());
}

export async function getRepository(): Promise<RepositoryType> {
  return await fetch(
    "https://api.github.com/repos/grigoriy-grisha/ChatGPT-vk-mini-app"
  ).then((data) => data.json());
}
