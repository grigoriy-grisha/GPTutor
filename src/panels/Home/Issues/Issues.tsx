import React, { memo, useEffect } from "react";
import {
  Banner,
  Header,
  HorizontalCell,
  HorizontalScroll,
  Spinner,
} from "@vkontakte/vkui";
import { githubController } from "../../../entity/Github";
import { GithubIcon } from "../../../icons";

import classes from "./Issues.module.css";

function Issues() {
  useEffect(() => githubController.getIssues(), []);
  if (githubController.getIssues$.error) return <div />;

  if (githubController.getIssues$.loading.get()) {
    return (
      <div className={classes.spinnerContainer}>
        <Spinner size="large" className={classes.spinner} />
      </div>
    );
  }

  return (
    <div>
      <Header mode="secondary">Прими участие в разработке приложения</Header>
      <HorizontalScroll>
        <div style={{ display: "flex" }}>
          {githubController.issues.get().map(({ html_url, title }) => (
            <HorizontalCell
              target="_blank"
              key={html_url}
              href={html_url}
              disabled
              size="l"
            >
              <Banner
                asideMode="expand"
                className={classes.bottomItem}
                before={<GithubIcon />}
                header="Open Source"
                subheader={<span>{title}</span>}
              />
            </HorizontalCell>
          ))}
        </div>
      </HorizontalScroll>
    </div>
  );
}

export default memo(Issues);
