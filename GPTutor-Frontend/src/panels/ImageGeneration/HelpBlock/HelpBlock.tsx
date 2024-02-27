import React from "react";
import { Button, Card, Div, Link, Spacing, Text, Title } from "@vkontakte/vkui";
import { Icon20InfoCircleOutline, Icon24DoneOutline } from "@vkontakte/icons";

import { imageGeneration } from "$/entity/image";

function HelpBlock() {
  if (imageGeneration.isHasHelpBlock$.get()) return null;

  return <>
    <Card mode="shadow">
      <Div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "max-content auto",
            gap: 8,
          }}
        >
          <Icon20InfoCircleOutline
            style={{
              color: "var(--vkui--color_background_accent_themed)",
            }}
            width={24}
            height={24}
          />
          <Title level="3" Component="h3">
            Старайтесь писать больше ключевых слов через запятую! Нейросети
            тяжело выстроить образ из 1-4 слов.{" "}
            <Link
              target="_blank"
              href="https://vk.com/@gptutor-primer-sozdaniya-kachestvennogo-zaprosa"
            >
              Пример создания качественного запроса.
            </Link>
          </Title>
        </div>
        <Spacing size={12} />
        <Button
          onClick={imageGeneration.setHelpBlock}
          mode="outline"
          style={{ width: "100%" }}
          after={<Icon24DoneOutline />}
        >
          Понятно
        </Button>
      </Div>
    </Card>
    <Spacing size={8} />
  </>;
}

export default HelpBlock;
