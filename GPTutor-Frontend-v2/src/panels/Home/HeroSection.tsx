import { FC } from "react";
import {
  DisplayTitle,
  Div,
  Group,
  Headline,
  Spacing,
  WriteBar,
  WriteBarIcon,
} from "@vkontakte/vkui";

export const HeroSection: FC = () => {
  return (
    <Group>
      <Div>
        <DisplayTitle level="1">
          Единый API интерфейс нейросетей <br /> в одном сервисе!
        </DisplayTitle>
        <Spacing size={8} />
        <Headline level="1" style={{ color: "#9c9c9c" }}>
          Без ВПН и зарубежных карт!
        </Headline>
        <Spacing size={16} />
        <WriteBar
          style={{
            border: "1px solid var(--vkui--color_separator_primary)",
            borderRadius: "var(--vkui--size_border_radius_paper--regular)",
          }}
          value=""
          // onChange={(e) => {}}
          after={
            <>
              <WriteBarIcon mode="send" />
            </>
          }
          placeholder="Что ты умеешь?"
        />
      </Div>
    </Group>
  );
};

