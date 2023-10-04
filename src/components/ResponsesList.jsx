import PropTypes from "prop-types";

ResponsesList.propTypes = {
  question: PropTypes.object,
};

function ResponsesList({ question }) {
  return (
    <div>
      {question.options.map((reponse, index) => (
        <span
          key={index}
          className={`response 
        ${
          question.user_answer === reponse &&
          reponse !== question.correct_answer
            ? "fail"
            : ""
        }
        ${question.correct_answer === reponse ? "primary" : ""}
        `}
        >
          {decodeURIComponent(reponse)}
        </span>
      ))}
    </div>
  );
}

export default ResponsesList;
