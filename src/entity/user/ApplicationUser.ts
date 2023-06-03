import { User } from "$/entity/user/types";
import { createUser } from "$/api/user";

class ApplicationUser {
  user: User | null = null;

  loadUser = async (vkId: number) => {
    this.user = await createUser(vkId);
  };
}

export const applicationUser = new ApplicationUser();
