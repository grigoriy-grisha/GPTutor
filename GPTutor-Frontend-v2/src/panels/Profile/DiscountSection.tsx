import { FC } from "react";
import { Group, SimpleCell } from "@vkontakte/vkui";
import { Icon24CommentAddBadgeOutline, Icon24ExternalLinkOutline } from "@vkontakte/icons";

export const DiscountSection: FC = () => {
  return (
    <Group>
      <SimpleCell
        before={<Icon24CommentAddBadgeOutline width={28} height={28} />}
        after={<Icon24ExternalLinkOutline />}
        subtitle="Поможем с интеграцией или предложим скидку до 20%!"
        href="https://vk.com/gigarouter"
        target="_blank"
      >
        Напишите нам в группу
      </SimpleCell>
    </Group>
  );
};
