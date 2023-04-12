export async function getIssues(): Promise<any[]> {
  return await fetch(
    "https://api.github.com/repos/grigoriy-grisha/chatGPT-miniApp/issues"
  ).then((data) => data.json());
}
