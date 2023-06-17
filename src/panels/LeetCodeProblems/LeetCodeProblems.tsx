import React, { useEffect } from "react";
import {
  Div,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Search,
  Separator,
  SimpleCell,
  Spinner,
  Text,
  Title,
} from "@vkontakte/vkui";
import { AppContainer } from "$/components/AppContainer";
import { useNavigationContext } from "$/NavigationContext";
import { leetCode } from "$/entity/leetCode/LeetCode";

import classes from "./LeetCodeProblems.module.css";
import { useInfinityScroll } from "$/hooks/useInfinityScroll";
import { StatusTag } from "$/panels/LeetCodeProblems/StatusTag";
import { chatGpt } from "$/entity/GPT";

interface IProps {
  id: string;
}

function LeetcodeProblems({ id }: IProps) {
  const { goBack, goToProblemDetail } = useNavigationContext();
  const setScrollableElement = useInfinityScroll({
    onLoadMore: () => leetCode.nextLoadProblems(),
    loading: false,
    hasNextPage: true,
  });

  useEffect(() => {
    leetCode.clearCurrentProblem();
    leetCode.loadProblems();
  }, []);

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        containerRef={setScrollableElement}
        className={classes.mainContainer}
        maxHeight
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <Title>LeetCode</Title>
          </PanelHeader>
        }
      >
        <div>
          <Search
            placeholder="Поиск проблемы leetcode"
            onChange={(event) => leetCode.searchLProblem(event.target.value)}
          />
        </div>

        {leetCode.leetcodeProblems$.loading.get() && (
          <Div>
            <Spinner size="large" />
          </Div>
        )}

        {leetCode.filteredPagedProblems$.get().map((problem) => (
          <>
            <SimpleCell
              className={classes.cell}
              disabled={leetCode.leetcodeDetailProblems$.loading.get()}
              key={problem.stat.question_id}
              after={<StatusTag status={problem.difficulty.level} />}
              onClick={async () => {
                await leetCode.loadDetailProblem(
                  problem.stat.question__title_slug
                );

                chatGpt.chatGptLeetCode.clearMessages();
                chatGpt.chatGptLeetCode.clearSystemMessage();
                chatGpt.chatGptLeetCode.clearSelectedMessages();

                goToProblemDetail();
              }}
            >
              <Text weight="2" className={classes.problemText}>
                {problem.stat.question__title}
              </Text>
            </SimpleCell>
            <Separator />
          </>
        ))}
      </AppContainer>
    </Panel>
  );
}

export default LeetcodeProblems;
