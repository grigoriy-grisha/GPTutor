import React, { memo, useEffect } from "react";
import {
  Banner,
  Header,
  HorizontalCell,
  HorizontalScroll,
  Spinner,
} from "@vkontakte/vkui";

import { githubController } from "$/entity/Github";
import { Issue } from "$/icons";
import { CardBlock } from "$/components/CardBlock";

import classes from "./Issues.module.css";

function Issues() {
  useEffect(() => githubController.getIssues(), []);
  if (githubController.getIssues$.error.get()) return <div />;

  if (githubController.getIssues$.loading.get()) {
    return (
      <CardBlock isBottom className={classes.spinnerContainer}>
        <Spinner size="large" className={classes.spinner} />
      </CardBlock>
    );
  }

  return (
    <CardBlock isBottom>
      <Header mode="tertiary">Открытые Issues</Header>
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
                before={<Issue />}
                header="Open Source"
                subheader={<span>{title}</span>}
              />
            </HorizontalCell>
          ))}
        </div>
      </HorizontalScroll>
    </CardBlock>
  );
}

export default memo(Issues);
