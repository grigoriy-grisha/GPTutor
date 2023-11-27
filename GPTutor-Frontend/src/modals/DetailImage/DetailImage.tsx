import React from "react";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  Separator,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import { useNavigationContext } from "$/NavigationContext";

function DetailImage() {
  const { sizeX } = useAdaptivityConditionalRender();
  const { goBack } = useNavigationContext();

  return (
    <ModalPage
      header={
        <>
          <ModalPageHeader
            before={
              sizeX.compact && (
                <PanelHeaderClose
                  className={sizeX.compact.className}
                  onClick={goBack}
                />
              )
            }
          >
            Изображение
          </ModalPageHeader>
          <Separator wide />
        </>
      }
    >
      <div></div>
    </ModalPage>
  );
}

export default DetailImage;
