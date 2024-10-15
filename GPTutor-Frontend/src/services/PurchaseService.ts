import bridge from "@vkontakte/vk-bridge";

class PurchaseService {
  async showOrderBox(item: string) {
    return await bridge
      .send("VKWebAppShowOrderBox", {
        type: "item",
        item: item,
      })
      .then((data: any) => {
        return data.success;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}

export const purchaseService = new PurchaseService();
