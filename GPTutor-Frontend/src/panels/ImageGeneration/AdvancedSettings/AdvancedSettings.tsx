import React from "react";

import {
  Accordion,
  Card,
  Div,
  FormItem,
  FormLayoutGroup,
  Input,
  Select,
  Separator,
  Slider,
  Spacing,
  Text,
  Title,
} from "@vkontakte/vkui";
import { imageGeneration } from "$/entity/image";
import classes from "$/panels/ImageGeneration/ImageGeneration.module.css";
import { AppDiv } from "$/components/AppDiv";
import { Icon24HelpOutline } from "@vkontakte/icons";
import { ChipsSelect } from "@vkontakte/vkui/dist/components/ChipsSelect/ChipsSelect";
import { negativePrompts } from "$/entity/image/prompts";
import { models, samplers } from "$/entity/image/styles";
import { AppTextTooltip } from "$/components/AppTextTooltip";

function AdvancedSettings() {
  return (
    <Card mode="shadow">
      <Div>
        <Accordion
          open={imageGeneration.advancedSettingOpen}
          className={classes.accordion}
        >
          <Accordion.Summary
            onClick={imageGeneration.toggleAdvancedSettingOpen}
          >
            <Title level="3" weight="3" className={classes.accordionTitle}>
              Расширенные настройки
            </Title>
          </Accordion.Summary>
          <Separator wide className={classes.separator} />
          <AppDiv>
            <FormItem
              htmlFor="negative"
              top={
                <div className={classes.formItemTitle}>
                  Негативные подсказки
                  <AppTextTooltip text="Негативные подсказки, то, чего не должно быть на изображении. Значения вписываются через запятую на английском. Например: уродство, деформированные конечности, усы.">
                    <Icon24HelpOutline width={20} height={20} />
                  </AppTextTooltip>
                </div>
              }
            >
              <ChipsSelect
                id="negative"
                placeholder="Чего не должно быть"
                onChange={(value) => imageGeneration.setNegativePrompts(value)}
                options={negativePrompts}
                creatable
                value={imageGeneration.negativePrompts$.get()}
              />
            </FormItem>
            <FormLayoutGroup mode="vertical">
              <FormItem
                htmlFor="model"
                top={
                  <div className={classes.formItemTitle}>
                    Модель
                    <AppTextTooltip text="Модель - это то, с помощью чего будет нарисовано изображение. Она определяет стиль и характеристики изображения.">
                      <Icon24HelpOutline width={20} height={20} />
                    </AppTextTooltip>
                  </div>
                }
              >
                <Select
                  options={models}
                  value={imageGeneration.model$.get()}
                  onChange={(event) => {
                    imageGeneration.setModel(event.target.value);
                  }}
                />
              </FormItem>
              <FormItem
                htmlFor="sampler"
                top={
                  <div className={classes.formItemTitle}>
                    Сэмплер
                    <AppTextTooltip text="Сэмплер — процессы, влияющие на результат генерации. С помощью правильно настроенного сэмплера можно получить разнообразные результаты при каждой генерации или совсем испортить изображение.">
                      <Icon24HelpOutline width={20} height={20} />
                    </AppTextTooltip>
                  </div>
                }
              >
                <Select
                  options={samplers}
                  value={imageGeneration.sampler$.get()}
                  onChange={(event) => {
                    imageGeneration.setSampler(event.target.value);
                  }}
                />
              </FormItem>
              <FormItem
                htmlFor="CFGScale"
                top={
                  <div className={classes.formItemTitle}>
                    CFG Scale
                    <AppTextTooltip text="CFG Scale — креативность нейросети. Чем ниже значение, тем сильнее нейросеть будет игнорировать ваш запрос. Чем выше, тем сильнее нейросеть придерживается вашего запроса. При высоких значениях могут возникать артефакты. Рекомендуемое значение  - 7.">
                      <Icon24HelpOutline width={20} height={20} />
                    </AppTextTooltip>
                  </div>
                }
              >
                <div>
                  {imageGeneration.CFGScale$.get()}
                  <Spacing size={4} />
                  <Slider
                    step={1}
                    min={0}
                    max={20}
                    id="CFGScale"
                    value={imageGeneration.CFGScale$.get()}
                    onChange={imageGeneration.setCFGScale}
                  />
                </div>
                {imageGeneration.CFGScale$.get() > 12 && (
                  <Text>
                    ❗ При высоком значении CFG Scale могут возникать артефакты.
                    Оптимальные занчения CFG Scale 5-9
                  </Text>
                )}
              </FormItem>
              <FormItem
                id="step"
                top={
                  <div className={classes.formItemTitle}>
                    Шаги
                    <AppTextTooltip text="Шаги — сколько шагов нейросеть сделает, пока генерирует изображение. Чем больше шагов, тем качественнее должен быть результат, а значит, тем больше времени уйдет на обработку запроса.">
                      <Icon24HelpOutline width={20} height={20} />
                    </AppTextTooltip>
                  </div>
                }
              >
                <div>
                  {imageGeneration.step$.get()}
                  <Spacing size={4} />
                  <Slider
                    step={1}
                    min={1}
                    max={50}
                    id="step"
                    value={imageGeneration.step$.get()}
                    onChange={imageGeneration.setStep}
                  />
                </div>
              </FormItem>
              <FormItem
                htmlFor="seed"
                top={
                  <div className={classes.formItemTitle}>
                    Сид
                    <AppTextTooltip text="Cид — стартовая точка, из которого нейросеть затем формирует изображение. По умолчанию стоит «случайный» параметр — это помогает достигать разных результатов при одном и том же запросе. А если вы используете конкретное номерное значение сида, то потом даже при смене запроса композиция картинки останется схожей.">
                      <Icon24HelpOutline width={20} height={20} />
                    </AppTextTooltip>
                  </div>
                }
              >
                <Input
                  placeholder="Начальная точка генерации"
                  id="seed"
                  type="text"
                  value={imageGeneration.seed$.get()}
                  onChange={(event) =>
                    imageGeneration.setSeed(event.target.value)
                  }
                />
              </FormItem>
            </FormLayoutGroup>
          </AppDiv>
          <Spacing size={8} />
        </Accordion>
      </Div>
    </Card>
  );
}

export default AdvancedSettings;
