import { Interview } from "$/entity/interview/Interview";
import { InterviewItem } from "$/entity/interview/InterviewItem";
import { ModeType } from "$/entity/lessons";

export const reactInterview = new Interview(ModeType.REACT_INTERVIEW, [
  new InterviewItem("Что такое JSX?"),
  new InterviewItem(
    "Чем отличается классовый компонент от функционального компонента в React?"
  ),
  new InterviewItem(
    "Что такое React и какие основные преимущества у этой технологии?"
  ),
  new InterviewItem("Расскажите о жизненном цикле компонента в React."),
  new InterviewItem(
    "Что такое состояние (state) в React и как его использовать?"
  ),
  new InterviewItem(
    "Что такое компоненты высшего порядка (HOC) и как они используются в React?"
  ),
  new InterviewItem(
    "Каким образом в React происходит передача данных между компонентами?"
  ),
  new InterviewItem(
    "Что такое контекст (Context) в React и в каких случаях его стоит использовать?"
  ),
  new InterviewItem(
    "Каким образом в React работает виртуальный DOM и в чем его преимущества?"
  ),
  new InterviewItem(
    "Каким образом в React обрабатывается событие и как можно обновить состояние компонента после события?"
  ),
  new InterviewItem("Что такое рендеринг в React и как он работает?"),
  new InterviewItem("Что такое виртуальный DOM в React и как он работает?"),
  new InterviewItem(
    "Что такое мемоизация (memoization) и как она применяется в React?"
  ),
  new InterviewItem("Как можно работать с асинхронными запросами в React?"),
  new InterviewItem(
    "Что такое React Router и как он используется для роутинга в React?"
  ),
]);
