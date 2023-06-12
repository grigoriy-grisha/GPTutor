import React from "react";

import { Icon28LogoVk } from "@vkontakte/icons";

import { CssIcon, DignalsIcon, ReactIcon, TypeScriptIcon } from "$/icons";
import { ModeType } from "$/entity/lessons";

export const stackData = [
  {
    icon: <ReactIcon />,
    header: "React",
    chapter: ModeType.React,
  },
  {
    icon: <TypeScriptIcon />,
    header: "Typescript",
    chapter: ModeType.Typescript,
  },
  {
    icon: <DignalsIcon />,
    header: "Dignals",
    href: "https://github.com/dmitriypereverza/dignals",
  },
  {
    icon: <Icon28LogoVk fill="var(--vkui--color_background_accent_themed)" />,
    header: "VK/UI",
    href: "https://vkcom.github.io/VKUI/",
  },
  { icon: <CssIcon />, header: "CSS", chapter: ModeType.HTMLCSS },
];
