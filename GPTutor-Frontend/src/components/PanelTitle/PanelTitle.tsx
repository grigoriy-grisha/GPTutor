import React from "react";
import classes from "./PanelTitle.module.css";

interface IProps {
  mobileTitle: string;
  title: string;
}

function PanelTitle({ mobileTitle, title }: IProps) {
  return (
    <>
      <div className={classes.mobile}>{mobileTitle}</div>
      <div className={classes.title}>{title}</div>
    </>
  );
}

export default PanelTitle;
