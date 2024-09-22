import { DetailProblem, Problem } from "$/entity/leetCode";
import { httpService } from "$/services/HttpService";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;
export async function leetcodeProblems(): Promise<Problem[]> {
  const response = await fetch(`${BACKEND_HOST}leetcode`, {
    headers: {
      Authorization: httpService.authorization,
    },
  });
  return response.json();
}

export async function leetcodeDetailProblems(
  slug: string
): Promise<DetailProblem> {
  const response = await fetch(`${BACKEND_HOST}leetcode/` + slug, {
    headers: {
      Authorization: httpService.authorization,
    },
  });
  return response.json();
}
