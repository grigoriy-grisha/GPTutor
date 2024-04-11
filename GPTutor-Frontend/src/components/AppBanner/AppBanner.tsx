import {
  Banner,
  classNames,
  Title,
  useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import classes from "./AppBanner.module.css";
import React from "react";

interface IProps {
  header: React.ReactNode;
  subheader: React.ReactNode;
  actions: React.ReactNode;
  before: React.ReactNode;
}

function AppBanner({ header, subheader, before, actions }: IProps) {
  const { sizeX } = useAdaptivityWithJSMediaQueries();
  const isCompact = sizeX === "compact";

  return (
    <Banner
      className={classNames(classes.banner, {
        [classes.compactBanner]: isCompact,
      })}
      before={before}
      header={<Title level="3" Component="h3">{header}</Title>}
      subheader={subheader}
      actions={actions}
    />
  );
}

export default AppBanner;
