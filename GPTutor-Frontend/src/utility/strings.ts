import {
  type AdaptivityProps,
  getViewWidthByViewportWidth,
  getViewHeightByViewportHeight,
  ViewWidth,
  SizeType,
} from "@vkontakte/vkui";
import type { UseAdaptivity } from "@vkontakte/vk-bridge-react";

export function plural(number: number, forms: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5];

  return forms[index];
}

export const transformVKBridgeAdaptivity = ({
  type,
  viewportWidth,
  viewportHeight,
}: UseAdaptivity): AdaptivityProps => {
  if (type === "adaptive") {
    return {
      viewWidth: getViewWidthByViewportWidth(viewportWidth),
      viewHeight: getViewHeightByViewportHeight(viewportHeight),
    };
  }

  if (type === "force_mobile" || type === "force_mobile_compact") {
    return {
      viewWidth: ViewWidth.MOBILE,
      sizeX: SizeType.COMPACT,
      sizeY:
        type === "force_mobile_compact" ? SizeType.COMPACT : SizeType.REGULAR,
    };
  }

  return {};
};
