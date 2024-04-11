import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";

import {
  Caption,
  Card,
  CardProps,
  Footnote,
  HasRef,
  HasRootRef,
  Headline,
  Tappable,
  TappableProps,
  Text,
} from "@vkontakte/vkui";

import styles from "./ContentCard.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface ContentCardProps
  extends HasRootRef<HTMLDivElement>,
    Omit<TappableProps, "getRootRef" | "crossOrigin">,
    Omit<
      React.ImgHTMLAttributes<HTMLImageElement>,
      keyof React.HTMLAttributes<HTMLImageElement>
    >,
    HasRef<HTMLImageElement> {
  /**
     Текст над заголовком
     */
  subtitle?: React.ReactNode;
  /**
     Заголовок
     */
  header?: React.ReactNode;
  /**
     Текст
     */
  text?: React.ReactNode;
  /**
     Нижний текст
     */
  caption?: React.ReactNode;
  /**
     Максимальная высота изображения
     */
  maxHeight?: number;
  mode?: CardProps["mode"];
  imgBackground?: string;
  imgBlur?: boolean;
}

/**
 * @see https://vkcom.github.io/VKUI/#/ContentCard
 */
export const ContentCard = ({
  imgBlur,
  subtitle,
  header,
  text,
  caption,
  // card props
  className,
  mode = "shadow",
  style,
  getRootRef,
  // img props
  getRef,
  maxHeight,
  src,
  srcSet,
  alt = "",
  width,
  height,
  crossOrigin,
  decoding,
  loading,
  referrerPolicy,
  sizes,
  useMap,
  hasHover = false,
  hasActive = false,
  imgBackground,
  ...restProps
}: ContentCardProps) => {
  return (
    <Card
      mode={mode}
      getRootRef={getRootRef}
      style={style}
      className={classNames(
        restProps.disabled && styles["ContentCard--disabled"],
        className
      )}
    >
      <Tappable
        {...restProps}
        disabled={restProps.disabled || (!restProps.onClick && !restProps.href)}
        hasHover={hasHover}
        hasActive={hasActive}
        className={styles["ContentCard__tappable"]}
      >
        <div
          className={styles["ContentCard__img"]}
          style={{ maxHeight, minHeight: maxHeight, background: imgBackground }}
        >
          {(src || srcSet) && (
            <LazyLoadImage
              effect="black-and-white"
              className={styles["ContentCard__img"]}
              src={src}
              srcSet={srcSet}
              alt={alt}
              crossOrigin={crossOrigin}
              decoding={decoding}
              loading={loading}
              referrerPolicy={referrerPolicy}
              sizes={sizes}
              useMap={useMap}
              height={height}
              style={{
                maxHeight,
                minHeight: maxHeight,
                filter: imgBlur ? "blur(16px)" : "",
              }}
              width="100%"
            />
          )}
        </div>
        <div className={styles["ContentCard__body"]}>
          {hasReactNode(subtitle) && (
            <Caption
              className={classNames(
                styles["ContentCard__text"],
                styles["ContentCard__subtitle"]
              )}
              weight="1"
              level="3"
              caps
            >
              {subtitle}
            </Caption>
          )}
          {hasReactNode(header) && (
            <Headline
              className={styles["ContentCard__text"]}
              weight="2"
              level="1"
              Component="h4"
            >
              {header}
            </Headline>
          )}
          {hasReactNode(text) && (
            <Text className={styles["ContentCard__text"]}>{text}</Text>
          )}
          {hasReactNode(caption) && (
            <Footnote
              className={classNames(
                styles["ContentCard__text"],
                styles["ContentCard__caption"]
              )}
            >
              {caption}
            </Footnote>
          )}
        </div>
      </Tappable>
    </Card>
  );
};
