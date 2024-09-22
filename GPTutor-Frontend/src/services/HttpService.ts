import { appService } from "$/services/AppService";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const BACKEND_HOST = env.REACT_APP_BACKEND_HOST;

const { initDataRaw } = retrieveLaunchParams();

console.log(initDataRaw);

class HttpService {
  authorization = appService.isVK()
    ? `Bearer ${location.href}`
    : `tma ${initDataRaw}`;

  post<T extends object>(path: string, body: T) {
    return fetch(`${BACKEND_HOST}${path}`, {
      method: "POST",
      headers: {
        Authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  get(path: string) {
    return fetch(`${BACKEND_HOST}${path}`, {
      method: "GET",
      headers: {
        Authorization: this.authorization,
        "Content-Type": "application/json",
      },
    });
  }

  delete(path: string) {
    return fetch(`${BACKEND_HOST}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: this.authorization,
      },
    });
  }

  put<T extends object>(path: string, body: T) {
    return fetch(`${BACKEND_HOST}${path}`, {
      method: "POST",
      headers: {
        Authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}

export const httpService = new HttpService();