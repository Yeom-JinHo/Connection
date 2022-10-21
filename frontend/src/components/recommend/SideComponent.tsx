import React from "react";
import { Tab } from "../../pages/Recommend";

import Tap from "./Tab";

interface SideComponentProps {
  tabs: Tab[];
  onTabClick: React.MouseEventHandler<HTMLDivElement>;
}

function SideComponent({ tabs, onTabClick }: SideComponentProps) {
  return (
    <>
      {tabs.map(tab => (
        <Tap
          key={tab.id}
          id={tab.id}
          label={tab.label}
          isSelected={tab.isSelected}
          onTabClick={onTabClick}
        />
      ))}
    </>
  );
}

export default SideComponent;
