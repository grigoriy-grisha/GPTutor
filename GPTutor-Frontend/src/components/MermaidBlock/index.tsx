import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import { classNames, Div, useAppearance } from "@vkontakte/vkui";

interface Props {
  mmd: string;
  id: string;
  className?: string;
  onRender?: (svg?: string) => void;
  onClick?: () => void;
}

function escape2Html(str: string) {
  //eslint-disable-next-line
  const arrEntities: any = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return str
    .replace(/&(lt|gt|nbsp|amp|quot);/gi, (_, t) => {
      return arrEntities[t];
    })
    .trim();
}

function MermaidBlock({ mmd, id, className, onRender, onClick }: Props) {
  const [svg, setSvg] = useState<string>("");
  const appearance = useAppearance();

  console.log(appearance);
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      theme: appearance === "dark" ? "dark" : "forest",
    });
  }, [appearance]);

  useEffect(() => {
    if (!mmd) return;
    mermaid.mermaidAPI.render(id, escape2Html(mmd), (svg) => {
      setSvg(svg);
      if (onRender) {
        onRender(svg);
      }
    });
  }, [mmd]);
  return (
    <Div
      onClick={onClick}
      className={classNames("mermaid", className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></Div>
  );
}

export default MermaidBlock;
