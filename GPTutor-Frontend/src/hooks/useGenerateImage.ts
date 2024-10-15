import { userInfo } from "$/entity/user/UserInfo";
import { useNavigationContext } from "$/NavigationContext";
import { imageGeneration } from "$/entity/image";

export function useGenerateImage() {
  const { openWeakRequest } = useNavigationContext();

  return (ignoreWeak = true) => {
    if (!userInfo.isHasImageAgreement.get()) {
      if (userInfo.viewUserAgreement.get()) {
        userInfo.setUserImageAgreement();
        imageGeneration.generate();
        return true;
      }

      imageGeneration.error$.set("Подтвердите соглашение!");
      return false;
    }

    if (!ignoreWeak) {
      if (imageGeneration.isWeakRequest()) {
        openWeakRequest();
        return false;
      }
    }

    imageGeneration.generate();

    return true;
  };
}
