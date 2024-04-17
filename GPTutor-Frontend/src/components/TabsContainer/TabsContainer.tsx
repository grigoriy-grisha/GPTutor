import React, { useState } from "react";
import { Separator, Tabs, TabsItem } from "@vkontakte/vkui";

import classes from "./TabsContainer.module.css";

export interface ITabData {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface IProps {
  tabs: ITabData[];
}

function TabsContainer({ tabs }: IProps) {
  const [selected, setSelected] = useState(tabs[0].id);
  return (
    <div className={classes.container}>
      <Tabs>
        {tabs.map((item) => (
          <TabsItem
            onClick={() => setSelected(item.id)}
            key={item.id}
            selected={selected === item.id}
          >
            {item.title}
          </TabsItem>
        ))}
      </Tabs>
      <Separator wide />
      {tabs.find((item) => item.id === selected)?.content}
    </div>
  );
}

export default TabsContainer;
