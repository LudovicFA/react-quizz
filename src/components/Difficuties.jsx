import PropTypes from "prop-types";

Difficulties.propTypes = {
  handleChangeDifficulty: PropTypes.func,
};

function Difficulties({ handleChangeDifficulty }) {
  const difficulties = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  return (
    <select
      id="difficultySelect"
      className="select"
      onChange={handleChangeDifficulty}
    >
      <option value="">Select difficulty</option>
      {difficulties.map((option) => (
        <option value={option.id} key={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Difficulties;
