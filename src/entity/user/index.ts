import { createReactiveModel } from "dignals-model";
import { UserInfo } from "@vkontakte/vk-bridge";

export const vkUserModel  = createReactiveModel("vkUser", {
  fields: {
    bdate: "",
    city: { id: 0, title: "" },
    country: { id: 0, title: "" },
    first_name: "",
    id: 0,
    last_name: "",
    photo_100: "",
    photo_200: "",
    photo_max_orig: "",
    sex: 1,
    timezone: 0
  } as UserInfo
}).create();

export const vkUser = vkUserModel.model;