import PropTypes from "prop-types";
import Question from "../components/Question";
import { useQuizz } from "../contexts/QuizzContext";
import { useNavigate } from "react-router-dom";

Results.propTypes = {
  questions: PropTypes.array,
  dispatch: PropTypes.func,
  status: PropTypes.string,
};

function Results() {
  const { questions, status, dispatch } = useQuizz();
  const navigate = useNavigate();

  function handleClick() {
    dispatch({ type: "newQuizz" });
    navigate("/");
  }

  const correctAnswers = questions.reduce((count, item) => {
    if (item.user_answer === item.correct_answer) {
      return count + 1;
    }
    return count;
  }, 0);
  return (
    <div>
      <h1>Results</h1>
      {status !== "finish" && <p>Impossible de consulter la page</p>}
      {questions.map((question, index) => (
        <Question question={question} numQuestion={index} key={index} />
      ))}
      {status === "finish" && (
        <p
          className={`
          total
            ${
              correctAnswers <= 1
                ? "low"
                : correctAnswers <= 3
                ? "medium"
                : "high"
            }`}
        >
          You scored {correctAnswers} out of {questions.length}
        </p>
      )}
      <div className="newQuizz">
        <button className="button" onClick={() => handleClick()}>
          Create a new quizz
        </button>
      </div>
    </div>
  );
}

export default Results;
