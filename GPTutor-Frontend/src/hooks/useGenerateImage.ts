import { userAgreement } from "$/entity/user/UserAgreement";
import { useNavigationContext } from "$/NavigationContext";
import { imageGeneration } from "$/entity/image";

export function useGenerateImage() {
  const { openAgreement } = useNavigationContext();

  return () => {
    console.log(userAgreement);
    if (!userAgreement.isHasImageAgreement.get()) {
      openAgreement();
      return;
    }

    imageGeneration.generate();
  };
}
