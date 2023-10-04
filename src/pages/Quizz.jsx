import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizz } from "../contexts/QuizzContext";
import Header from "../components/Header";
import QuestionsList from "../components/QuestionsList";

function Quizz() {
  const navigate = useNavigate();
  const { questions, status, dispatch, userAnswered } = useQuizz();

  const [categoryId, setCategoryId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  function handleCreate() {
    async function fetchQuestions() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple&encode=url3986`
        );
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();

        dispatch({ type: "createQuizz", payload: data.results });
      } catch (err) {
        setErrors(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }

  function handleSubmit() {
    dispatch({ type: "finishQuizz" });
    navigate("/results");
  }

  return (
    <div>
      <h1>Quizz App</h1>
      {errors && <p>{errors}</p>}
      <Header
        handleChangeCategory={(e) => setCategoryId(e.target.value)}
        handleChangeDifficulty={(e) => setDifficulty(e.target.value)}
        handleCreate={handleCreate}
      />

      {isLoading && status === "start" && <h2>Loading ...</h2>}
      {!isLoading && status === "start" && questions.length > 0 && (
        <QuestionsList questions={questions} dispatch={dispatch} />
      )}

      {!isLoading &&
        status === "start" &&
        questions.length > 0 &&
        userAnswered === questions.length && (
          <button className="button primary" onClick={handleSubmit}>
            Submit
          </button>
        )}
    </div>
  );
}

export default Quizz;
