import { DetailProblem, Problem } from "$/entity/leetCode";

const BACKEND_HOST = _env_.REACT_APP_BACKEND_HOST;
export async function leetcodeProblems(): Promise<Problem[]> {
  const response = await fetch(`${BACKEND_HOST}leetcode`, {
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });
  return response.json();
}

export async function leetcodeDetailProblems(
  slug: string
): Promise<DetailProblem> {
  const response = await fetch(`${BACKEND_HOST}leetcode/` + slug, {
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });
  return response.json();
}
