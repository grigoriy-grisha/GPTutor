import { Card, Checkbox, Link, Spacing } from "@vkontakte/vkui";
import { userInfo } from "$/entity/user/UserInfo";
import React from "react";
import { useNavigationContext } from "$/NavigationContext";

function AgreementBlock() {
  const { openAgreement } = useNavigationContext();

  if (userInfo.isHasImageAgreement.get()) return null;

  return (
    <>
      <Spacing size={6} />
      <Card mode="outline">
        <Checkbox
          checked={userInfo.viewUserAgreement.get()}
          onChange={userInfo.toggleViewUserAgreement}
        >
          Подтверждаю{" "}
          <Link onClick={openAgreement} style={{ textAlign: "left" }}>
            пользовательское соглашение
          </Link>
        </Checkbox>
      </Card>
    </>
  );
}

export default AgreementBlock;
