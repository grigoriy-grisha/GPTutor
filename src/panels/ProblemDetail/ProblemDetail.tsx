import {
  Button,
  Div,
  FixedLayout,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Separator,
} from "@vkontakte/vkui";
import React, { useMemo } from "react";
import { useNavigationContext } from "$/NavigationContext";
import { leetCode } from "$/entity/leetCode/LeetCode";
import Markdown from "$/services/Markdown";
import { AppDiv } from "$/components/AppDiv";
import { Icon56GhostOutline } from "@vkontakte/icons";
import { AppContainer } from "$/components/AppContainer";

import classes from "./ProblemDetail.module.css";

interface IProps {
  id: string;
}

function ProblemDetail({ id }: IProps) {
  const { goBack, goToChatLeetCode } = useNavigationContext();

  const content = leetCode.currentProblem?.data.question.content;
  const markdown = useMemo(() => new Markdown(), []);
  const html = markdown.renderHtml(content || "");

  return (
    <Panel id={id}>
      <AppContainer
        withoutTabbar
        headerChildren={
          <PanelHeader before={<PanelHeaderBack onClick={goBack} />}>
            Условие задачи
          </PanelHeader>
        }
      >
        <AppDiv className={classes.container}>
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          ) : (
            <Placeholder
              style={{ paddingTop: 70 }}
              icon={<Icon56GhostOutline />}
              header="Нет условия"
              action={
                <Button
                  target="_blank"
                  mode="outline"
                  size="m"
                  href={`https://leetcode.com/problems/${leetCode.currentProblemSlug}`}
                >
                  Посмотреть задачу в leetcode
                </Button>
              }
            >
              Условие задачи отсутствует
            </Placeholder>
          )}
        </AppDiv>
        {content && (
          <FixedLayout vertical="bottom" className={classes.nextChat}>
            <Separator wide />
            <Div className={classes.buttons}>
              <Button
                target="_blank"
                size="m"
                href={`https://leetcode.com/problems/${leetCode.currentProblemSlug}`}
              >
                Перейти в leetcode
              </Button>
              <Button size="m" onClick={goToChatLeetCode}>
                Перейти в чат
              </Button>
            </Div>
          </FixedLayout>
        )}
      </AppContainer>
    </Panel>
  );
}

export default ProblemDetail;
