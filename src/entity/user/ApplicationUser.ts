import { User } from "$/entity/user/types";
import { createUser } from "$/api/user";
import ReactivePromise from "$/services/ReactivePromise";

class ApplicationUser {
  user: User | null = null;

  createUser$ = ReactivePromise.create(createUser);

  loadUser = async (vkId: number) => {
    this.user = await this.createUser$.run(vkId);
  };
}

export const applicationUser = new ApplicationUser();
