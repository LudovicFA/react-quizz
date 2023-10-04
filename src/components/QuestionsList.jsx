import PropTypes from "prop-types";
import Question from "./Question";

QuestionsList.propTypes = {
  questions: PropTypes.array,
};
function QuestionsList({ questions }) {
  return (
    <div>
      {questions.map((question, index) => (
        <Question question={question} numQuestion={index} key={index} />
      ))}
    </div>
  );
}

export default QuestionsList;
