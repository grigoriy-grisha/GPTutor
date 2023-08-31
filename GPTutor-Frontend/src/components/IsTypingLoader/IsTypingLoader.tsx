import React from "react";
import classes from "./IsTypingLoader.module.css";

function IsTypingLoader() {
  return (
    <span className={classes.loader} style={{ height: "4px", width: "4px" }} />
  );
}

export default IsTypingLoader;
