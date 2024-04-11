const resizeFrame = (width: number, height: number) => {
  self.resizeTo(width, height);
  self.parent.postMessage(
    {
      type: "vk-connect",
      handler: "VKWebAppResizeWindow",
      params: {
        width,
        height,
      },
    },
    "*"
  );
};

const FIT = "fit-content";
const HEIGHT = "height";

export const listenResize = (
  minHeight = 500,
  width = 630,

  // 64 + 64 + 16 + 3
  frame = 147,

  // 14 + 10 + 80
  layer = 104
) => {
  const listen = (event: MessageEvent) => {
    const { type, data } = Object.assign({}, event.data);

    if (type === "VKWebAppUpdateConfig") {
      let height = +data.viewport_height;

      if (height) {
        height = Math.max(minHeight, height - (data.is_layer ? layer : frame));

        resizeFrame(width, height);
      }
    }
  };

  self.addEventListener("message", listen);

  return () => {
    self.removeEventListener("message", listen);
  };
};
