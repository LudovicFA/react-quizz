import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { shuffle } from "../utils/helpers";

const QuizzContext = createContext();

const initialState = {
  questions: [],
  status: "ready",
};

function reducer(state, action) {
  switch (action.type) {
    case "newQuizz":
      return { ...state, questions: [], status: "ready" };

    case "createQuizz":
      return {
        ...state,
        questions: action.payload.map((question) => {
          question.options = shuffle([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return question;
        }),
        status: "start",
      };

    case "answerQuestion":
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === action.payload.numQuestion
            ? { ...question, user_answer: action.payload.option }
            : question
        ),
      };

    case "finishQuizz":
      return {
        ...state,
        status: "finish",
      };

    default:
      throw new Error("Action unknow");
  }
}

QuizzProvider.propTypes = {
  children: PropTypes.object,
};

function QuizzProvider({ children }) {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const userAnswered = questions.reduce(
    (count, question) => (question.user_answer ? count + 1 : count),
    0
  );

  return (
    <QuizzContext.Provider
      value={{
        questions,
        status,
        userAnswered,
        dispatch,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
}
function useQuizz() {
  const context = useContext(QuizzContext);
  if (context === undefined)
    throw new Error("QuizzContext was used outside of the provider");
  return context;
}

export { QuizzProvider, useQuizz };
