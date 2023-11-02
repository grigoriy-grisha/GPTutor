import {
  Caption,
  Card,
  CellButton,
  Div,
  ModalPage,
  ModalPageHeader,
  Text,
  Separator,
  Title,
  Spacing,
  PanelHeaderClose,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import React from "react";
import {
  Icon32DonutCircleFillYellow,
  Icon24VideoAdvertisement,
  Icon28DonateCircleFillYellow,
  Icon32StarsCircleFillViolet,
  Icon28FireCircleFillRed,
  Icon28UserAddOutline,
  Icon28FavoriteAddOutline,
  Icon28SmartphoneShareOutline,
} from "@vkontakte/icons";

import classes from "./ImageDonut.module.css";
import CountIndicator from "../../components/CountIndicator/CountIndicator";
import { useNavigationContext } from "$/NavigationContext";
import { attempts } from "$/entity/attempts";
import { purchaseService } from "$/services/PurchaseService";

interface IProps {
  id: string;
}

function ImageDonut({ id }: IProps) {
  const { goBack } = useNavigationContext();
  const { sizeX } = useAdaptivityConditionalRender();
  const freeCount = attempts.$attemptsToFree.get();

  return (
    <ModalPage
      className={classes.container}
      id={id}
      settlingHeight={100}
      onClose={goBack}
      header={
        <>
          <ModalPageHeader
            before={
              sizeX.compact && (
                <PanelHeaderClose
                  className={sizeX.compact.className}
                  onClick={goBack}
                />
              )
            }
          >
            Получить генерации
          </ModalPageHeader>
          <Separator wide />
        </>
      }
    >
      <Div>
        <Title level="3">Пакеты генераций</Title>
      </Div>
      <CellButton
        before={<Icon28DonateCircleFillYellow />}
        onClick={() => purchaseService.showOrderBox("firstItem")}
      >
        <Text weight="1">200 генераций</Text>
        <Caption className={classes.subtitle}>10 голосов</Caption>
      </CellButton>
      <Separator />
      <CellButton
        before={<Icon32StarsCircleFillViolet height={28} width={28} />}
        onClick={() => purchaseService.showOrderBox("secondItem")}
      >
        <Text weight="1">500 генераций (100 в подарок)</Text>
        <Caption className={classes.subtitle}>20 голосов</Caption>
      </CellButton>
      <Separator />
      <CellButton
        before={<Icon28FireCircleFillRed />}
        onClick={() => purchaseService.showOrderBox("thirdItem")}
      >
        <Text weight="1">1200 генераций (200 в подарок)</Text>
        <Caption className={classes.subtitle}>50 голосов</Caption>
      </CellButton>
      <Spacing size={6} />
      <Separator />
      <Spacing size={6} />
      <Div>
        <Title level="2">Получить бесплатно</Title>
      </Div>
      <CellButton
        disabled={freeCount === 0}
        onClick={attempts.watchAd}
        before={<Icon24VideoAdvertisement height={28} width={28} />}
        after={
          <div style={{ marginRight: 12 }}>
            <CountIndicator
              negativeCount={3}
              warningCount={6}
              count={freeCount}
            />
          </div>
        }
      >
        <Text weight="1">Просмотр рекламы - 10 генераций</Text>
        <Caption className={classes.subtitle}>Обновление в 00:00</Caption>
      </CellButton>
      {/*<Separator />*/}
      {/*<CellButton before={<Icon28UserAddOutline />}>*/}
      {/*  <Text weight="1">За подписку - 20 генераций</Text>*/}
      {/*</CellButton>*/}
      {/*<Separator />*/}
      {/*<CellButton before={<Icon28FavoriteAddOutline />}>*/}
      {/*  <Text weight="1">Добавить в избранное - 10 генераций</Text>*/}
      {/*</CellButton>*/}
      {/*<Separator />*/}
      {/*<CellButton*/}
      {/*  before={<Icon28SmartphoneShareOutline />}*/}
      {/*  after={*/}
      {/*    <div style={{ marginRight: 12 }}>*/}
      {/*      <CountIndicator negativeCount={1} warningCount={3} count={5} />*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*>*/}
      {/*  <Text weight="1">Поделиться - 5 генераций</Text>*/}
      {/*</CellButton>*/}

      <Spacing size={12} />
    </ModalPage>
  );
}

export default ImageDonut;
