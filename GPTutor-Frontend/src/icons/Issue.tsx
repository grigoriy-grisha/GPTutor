import React from "react";
import { useConfigProvider } from "@vkontakte/vkui";

export function Issue() {
  const { appearance } = useConfigProvider();
  const color = appearance === "dark" ? "#fff" : "#000";

  return (
    <svg
      fill={color}
      aria-hidden="true"
      width="32"
      height="32"
      viewBox="0 0 16 16"
      version="1.1"
      data-view-component="true"
    >
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </svg>
  );
}
