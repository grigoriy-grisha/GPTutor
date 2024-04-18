import { sig } from "dignals";
import { AdditionalRequestItem } from "$/entity/additionalRequest/AdditionalRequestItem";
import {
  createAdditionalRequest,
  deleteAdditionalRequestById,
  getAdditionalRequest,
  updateAdditionalRequestById,
} from "$/api/additionalRequest";
import { AdditionalRequestCreate } from "$/entity/additionalRequest/types";

export type Request = { message: string; title: string; isDisable?: boolean };

class AdditionalRequests {
  requests$ = sig(new Set<AdditionalRequestItem>());

  async init() {
    await this.initRequest();
  }

  getAvailableRequests() {
    return [...this.requests$.get()]
      .filter((request) => request.isActive$.get())
      .filter((request) => !!request.message$.get() && !!request.title$.get());
  }

  async initRequest() {
    const requests = await getAdditionalRequest();

    this.requests$.set(
      new Set(
        requests.map(
          ({ id, message, title, active }) =>
            new AdditionalRequestItem(id, message, title, active)
        )
      )
    );
  }

  async createRequest(request: AdditionalRequestCreate) {
    const additionalRequest = await createAdditionalRequest(request);

    const set = new Set(this.requests$.get());
    set.add(
      new AdditionalRequestItem(
        additionalRequest.id,
        request.message,
        request.title,
        request.active
      )
    );

    this.requests$.set(set);
  }

  async deleteRequest(request: AdditionalRequestItem) {
    await deleteAdditionalRequestById(request.id);

    const set = new Set(this.requests$.get());
    set.delete(request);

    console.log(set);

    this.requests$.set(set);
  }

  updateAdditionalRequest = async (request: AdditionalRequestItem) => {
    console.log(request);
    await updateAdditionalRequestById({
      id: request.id,
      active: request.isActive$.get(),
      message: request.message$.get(),
      title: request.title$.get(),
    });
  };
}

export const additionalRequests = new AdditionalRequests();
