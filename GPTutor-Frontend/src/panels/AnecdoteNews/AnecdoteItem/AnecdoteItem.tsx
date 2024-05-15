import { Card, classNames, Div, Tappable, Title } from "@vkontakte/vkui";
import {
  Icon20LikeCircleFillGray,
  Icon20LikeCircleFillRed,
} from "@vkontakte/icons";
import React from "react";
import { HumorItem } from "$/entity/humor";
import { ImageGenerationBlock } from "$/components/ImageGenerationBlock";
import { humorNews } from "$/entity/humor/HumorNews";

import classes from "../AnecdoteNews.module.css";

interface IProps {
  humorItem: HumorItem;
}

function AnecdoteItem({ humorItem }: IProps) {
  const isLiked = humorNews.isLiked(humorItem);

  return (
    <Card mode="shadow" className={classes.card}>
      <Div>
        <Title level="3" weight="2">
          {humorItem.content}
        </Title>
        {humorItem.imageUrl && (
          <div className={classes.imageContainer}>
            <div className={classes.imageNormalize}>
              <ImageGenerationBlock
                loading={false}
                widthView={512}
                heightView={512}
                isEmpty={false}
                url={humorItem.imageUrl}
              />
            </div>
          </div>
        )}

        <div className={classes.actionsContainer}>
          <Card
            className={classNames(classes.likeCard, {
              [classes.likeActiveCard]: isLiked,
            })}
          >
            <Tappable
              onClick={() =>
                isLiked
                  ? humorNews.removeLike(humorItem)
                  : humorNews.addLike(humorItem)
              }
              className={classNames(classes.like, {
                [classes.likedText]: isLiked,
                [classes.unlikedText]: !isLiked,
              })}
            >
              {isLiked ? (
                <Icon20LikeCircleFillRed className={classes.likeActive} />
              ) : (
                <Icon20LikeCircleFillGray />
              )}
              <Title level="3"> {humorItem.humorEntityLikes.length}</Title>
            </Tappable>
          </Card>
          {/*<Card style={{ marginLeft: 12 }}>*/}
          {/*  <Tappable className={classes.share}>*/}
          {/*    <Icon28ShareOutline width={20} height={20} />*/}
          {/*  </Tappable>*/}
          {/*</Card>*/}
        </div>
      </Div>
    </Card>
  );
}

export default AnecdoteItem;
