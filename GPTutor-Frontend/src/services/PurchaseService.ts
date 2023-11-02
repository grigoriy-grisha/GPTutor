import bridge from "@vkontakte/vk-bridge";

class PurchaseService {
  showOrderBox(item: string) {
    bridge
      .send("VKWebAppShowOrderBox", {
        type: "item",
        item: item,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }
}

export const purchaseService = new PurchaseService();
