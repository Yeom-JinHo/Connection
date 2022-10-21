import React, { useState } from "react";
import { Grid } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import ProblemCard from "../components/common/ProblemCard";
import StudyLayout from "../components/layout/StudyLayout";
import SideComponent from "../components/recommend/SideComponent";

const TABS = [
  {
    id: 0,
    label: "많이 푼 유형",
    msg: "자주 출제되는 유형 중/가장 많이 푼 유형의 문제들을 추천해 줍니다. "
  },
  {
    id: 1,
    label: "푼지 오래된 유형",
    msg: "자주 출제되는 유형 중/가장 푼지 오래된 유형의 문제들을 추천해 줍니다. "
  },
  {
    id: 2,
    label: "많이 담은 문제",
    msg: "자주 출제되는 유형 중/다른 스터디가 많이 담아놓은 문제들을 추천해 줍니다. "
  }
];

export interface Tab {
  id: number;
  label: string;
}

function PlusButton() {
  return <AddIcon w="6" h="6" cursor="pointer" alignSelf="center" />;
}

function Recommend() {
  const [selectedTap, setSelectedTap] = useState(0);

  const onTabClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.target instanceof HTMLDivElement && e.target.dataset.id) {
      const targetId = Number(e.target.dataset.id);
      setSelectedTap(targetId);
    }
  };

  return (
    <StudyLayout
      sideComponent={
        <SideComponent
          tabs={TABS}
          selectedTap={selectedTap}
          onTabClick={onTabClick}
        />
      }
      title={TABS[selectedTap].label}
      description={TABS[selectedTap].msg}
    >
      <Grid templateColumns="repeat(2,1fr)" gap="32px">
        <ProblemCard
          problem={{
            title: "징검다리 건너기",
            difficulty: "골드 3",
            elapsedTime: "1:10:23",
            link: "http://asasfasf.com",
            tags: [{ id: 0, title: "#dfs" }]
          }}
          button={<PlusButton />}
        />
      </Grid>
    </StudyLayout>
  );
}
export default Recommend;
