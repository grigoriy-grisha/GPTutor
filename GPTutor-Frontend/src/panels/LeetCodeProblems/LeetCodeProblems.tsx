import React, { useEffect } from "react";
import {
  Div,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Search,
  Separator,
  SimpleCell,
  Spinner,
  Text,
  Title,
} from "@vkontakte/vkui";
import { Icon56GhostOutline } from "@vkontakte/icons";

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
    leetCode.searchLProblem(leetCode.searchValue$.get());
  }, []);

  const loading = leetCode.leetcodeProblems$.loading.get();
  const problems = leetCode.filteredPagedProblems$.get();

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        containerRef={setScrollableElement}
        className={classes.mainContainer}
        maxHeight
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            <Title Component="h1">LeetCode</Title>
          </PanelHeader>
        }
      >
        <div>
          <Search
            value={leetCode.searchValue$.get()}
            placeholder="Поиск проблемы leetcode"
            onChange={(event) => leetCode.searchLProblem(event.target.value)}
          />
        </div>

        {loading && (
          <Div>
            <Spinner size="large" />
          </Div>
        )}

        {!loading && !problems.length && (
          <Placeholder
            style={{ paddingTop: 60 }}
            icon={<Icon56GhostOutline />}
            header="Ничего не найдено"
          />
        )}

        {problems.map((problem) => (
          <>
            <SimpleCell
              className={classes.cell}
              disabled={loading}
              key={problem.stat.question_id}
              after={<StatusTag status={problem.difficulty.level} />}
              onClick={async () => {
                await leetCode.loadDetailProblem(
                  problem.stat.question__title_slug
                );

                chatGpt.chatGptLeetCode.clearMessages();
                chatGpt.chatGptLeetCode.resetSystemMessage();
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
