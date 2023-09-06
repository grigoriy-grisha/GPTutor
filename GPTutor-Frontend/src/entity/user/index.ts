import { createReactiveModelBuilder } from "dignals-model";

class VkUserModelBuilder {
  bdate = "";
  city = { id: 0, title: "" };
  country = { id: 0, title: "" };
  first_name = "";
  id = 0;
  last_name = "";
  photo_100 = "";
  photo_200 = "";
  photo_max_orig = "";
  sex = 1;
  timezone = 0;
}

export const vkUserModel =
  createReactiveModelBuilder(VkUserModelBuilder).create();

export const vkUser = vkUserModel.model$;
