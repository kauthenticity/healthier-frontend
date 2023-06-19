import { Dispatch } from "react";
import { IAnswer, IQuestion } from "src/interfaces/diagnoseApi/diagnosis";
import { AnswersContainer, ButtonBox, ButtonText } from "./index.style";

interface IDefButton {
  answers: IAnswer[];
  question: IQuestion;
  selectedAnswer: IAnswer[];
  setSelectedAnswer: Dispatch<IAnswer[]>;
  handleActive: (id: number) => boolean;
}

const DefButton = ({ answers, question, selectedAnswer, setSelectedAnswer, handleActive }: IDefButton) => {
  const handleSelect = (id: number) => {
    if (question.is_multiple) {
      const filtered = selectedAnswer.filter((ans) => ans.answer_id !== id);

      if (filtered.length !== selectedAnswer.length) {
        setSelectedAnswer(filtered);
      } else {
        const filtered_idx = answers.findIndex((ans) => ans.answer_id === id);

        setSelectedAnswer([...selectedAnswer, answers[filtered_idx]]);
      }
    } else {
      const filtered_idx = answers.findIndex((ans) => ans.answer_id === id);

      setSelectedAnswer([answers[filtered_idx]]);
    }
  };

  return (
    <AnswersContainer ansCount={answers.length}>
      {answers.length !== 0 &&
        answers.map((ans, idx) => (
          <ButtonBox key={idx} onClick={() => handleSelect(ans.answer_id)} selected={handleActive(ans.answer_id)}>
            <section className="button">
              <ButtonText>{ans.answer}</ButtonText>
            </section>
          </ButtonBox>
        ))}
    </AnswersContainer>
  );
};

export default DefButton;