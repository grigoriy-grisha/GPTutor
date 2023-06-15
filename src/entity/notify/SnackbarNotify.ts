import { Notify } from "./notify";

export type SnackbarNotify = {
  type: "error" | "success";
  message: string;

  delay?: number;
};

export const snackbarNotify = new Notify<SnackbarNotify>();
