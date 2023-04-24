export async function getIssues(): Promise<any[]> {
  return await fetch(
    "https://api.github.com/repos/grigoriy-grisha/ChatGPT-vk-mini-app/issues"
  ).then((data) => data.json());
}

export async function getRepository() {
  return await fetch(
    "https://api.github.com/repos/grigoriy-grisha/ChatGPT-vk-mini-app"
  ).then((data) => data.json());
}
