import { Notify } from "./notify";

export type SnackbarNotify = {
  type: "error" | "success";
  message: string;
};

export const snackbarNotify = new Notify<SnackbarNotify>();
