import { Card, Checkbox, Link, Spacing } from "@vkontakte/vkui";
import { userAgreement } from "$/entity/user/UserAgreement";
import React from "react";
import { useNavigationContext } from "$/NavigationContext";

function AgreementBlock() {
  const { openAgreement } = useNavigationContext();

  if (userAgreement.isHasImageAgreement.get()) return null;

  return (
    <>
      <Spacing size={6} />
      <Card mode="outline">
        <Checkbox
          checked={userAgreement.viewUserAgreement.get()}
          onChange={userAgreement.toggleViewUserAgreement}
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
