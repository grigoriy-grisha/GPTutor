import { sig } from "dignals";

import { User } from "$/entity/user/types";
import { createUser } from "$/api/user";
import ReactivePromise from "$/services/ReactivePromise";

class ApplicationUser {
  user: User | null = null;

  loading$ = sig<boolean>(false);

  createUser$ = ReactivePromise.create(createUser);

  constructor() {
    this.loading$.set(false);
  }

  loadUser = async (vkId: number) => {
    this.user = await this.createUser$.run(vkId);
    this.loading$.set(false);
  };
}

export const applicationUser = new ApplicationUser();
