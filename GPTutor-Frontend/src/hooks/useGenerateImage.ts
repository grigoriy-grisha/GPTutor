import { userAgreement } from "$/entity/user/UserAgreement";
import { useNavigationContext } from "$/NavigationContext";
import { imageGeneration } from "$/entity/image";

export function useGenerateImage() {
  const { openWeakRequest } = useNavigationContext();

  return (ignoreWeak = true) => {
    if (!userAgreement.isHasImageAgreement.get()) {
      if (userAgreement.viewUserAgreement.get()) {
        userAgreement.setUserImageAgreement();
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
