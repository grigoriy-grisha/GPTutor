import { Problem } from "$/entity/leetCode";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;
export async function getSubscription(): Promise<Problem[]> {
  const response = await fetch(`${BACKEND_HOST}purchase/subscription`, {
    headers: {
      Authorization: "Bearer " + location.href,
    },
  });
  return response.json();
}
