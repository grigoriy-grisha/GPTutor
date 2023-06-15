import {
  Panel,
  PanelHeader,
  PanelHeaderClose,
  Placeholder,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import React, { useMemo } from "react";
import { useNavigationContext } from "$/NavigationContext";
import { leetCode } from "$/entity/leetCode/LeetCode";
import Markdown from "$/services/Markdown";
import { AppDiv } from "$/components/AppDiv";
import { Icon56GhostOutline } from "@vkontakte/icons";

interface IProps {
  id: string;
}

function ProblemDetail({ id }: IProps) {
  const { goBack } = useNavigationContext();
  const { sizeX } = useAdaptivityConditionalRender();

  const content = leetCode.currentProblem?.data.question.content;
  const markdown = useMemo(() => new Markdown(), []);
  const html = markdown.renderHtml(content || "");

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          sizeX.compact && (
            <PanelHeaderClose
              className={sizeX.compact.className}
              onClick={goBack}
            />
          )
        }
      >
        Условие задачи
      </PanelHeader>
      <AppDiv>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        ) : (
          <Placeholder
            style={{ paddingTop: 70 }}
            icon={<Icon56GhostOutline />}
            header="Нет условия"
          >
            Условие задачи отсутствует
          </Placeholder>
        )}
      </AppDiv>
    </Panel>
  );
}

export default ProblemDetail;
