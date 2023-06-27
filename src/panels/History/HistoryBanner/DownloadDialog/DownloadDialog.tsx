import { IconButton, Separator, SimpleCell, Title } from "@vkontakte/vkui";
import { Icon56DownloadSquareOutline } from "@vkontakte/icons";
import React, { useState } from "react";
import { RichTooltip } from "@vkontakte/vkui/dist/components/RichTooltip/RichTooltip";

import classes from "./DownloadDialog.module.css";
import { OutsideAlerter } from "$/components/OutsideAlerter";

interface IProps {
  downloadTXT: () => Promise<void>;
  downloadJSON: () => Promise<void>;
}

function DownloadDialog({ downloadTXT, downloadJSON }: IProps) {
  const [shown, setShown] = useState(false);

  return (
    <OutsideAlerter handleOutside={() => setShown(false)}>
      {(getRef) => (
        <RichTooltip
          getRef={getRef}
          placement="left-end"
          shown={shown}
          content={
            <div>
              <SimpleCell
                onClick={async () => {
                  await downloadJSON();
                  setShown(false);
                }}
              >
                Скачать{" "}
                <Title className={classes.extension} level="3">
                  JSON
                </Title>
              </SimpleCell>
              <Separator />
              <SimpleCell
                onClick={async () => {
                  await downloadTXT();
                  setShown(false);
                }}
              >
                Скачать{" "}
                <Title className={classes.extension} level="3">
                  TXT
                </Title>
              </SimpleCell>
            </div>
          }
        >
          <IconButton
            className={classes.download}
            onClick={() => setShown(!shown)}
          >
            <Icon56DownloadSquareOutline width={34} height={34} />
          </IconButton>
        </RichTooltip>
      )}
    </OutsideAlerter>
  );
}

export default DownloadDialog;
