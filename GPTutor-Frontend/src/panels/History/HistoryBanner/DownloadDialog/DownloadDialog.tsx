import { IconButton, Popover, Separator, SimpleCell, Title } from "@vkontakte/vkui";
import { Icon56DownloadSquareOutline } from "@vkontakte/icons";
import React, { useState } from "react";

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
        <Popover
          placement="left"
          shown={shown}
          content={
            <div>
              <SimpleCell
                className={classes.simpleCell}
                onClick={async () => {
                  await downloadJSON();
                  setShown(false);
                }}
              >
                <Title level="3" className={classes.extension} Component="h3">
                  JSON
                </Title>
              </SimpleCell>
              <Separator />
              <SimpleCell
                className={classes.simpleCell}
                onClick={async () => {
                  await downloadTXT();
                  setShown(false);
                }}
              >
                <Title level="3" className={classes.extension} Component="h3">
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
        </Popover>
      )}
    </OutsideAlerter>
  );
}

export default DownloadDialog;
