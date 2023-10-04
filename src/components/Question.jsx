import PropTypes from "prop-types";
import { useQuizz } from "../contexts/QuizzContext";
import OptionsList from "./OptionsList";
import ResponsesList from "./ResponsesList";

Question.propTypes = {
  question: PropTypes.object,
  numQuestion: PropTypes.number,
};

function Question({ question, numQuestion }) {
  const { status, dispatch } = useQuizz();

  function handleSelectOptions(option) {
    dispatch({ type: "answerQuestion", payload: { numQuestion, option } });
  }

  return (
    <div>
      <p>{decodeURIComponent(question.question)}</p>
      {status === "start" && (
        <div>
          <OptionsList
            options={question.options}
            handleSelectOptions={handleSelectOptions}
          />
        </div>
      )}
      {status === "finish" && <ResponsesList question={question} />}
    </div>
  );
}

export default Question;
