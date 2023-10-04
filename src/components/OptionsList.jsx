import PropTypes from "prop-types";
import { useState } from "react";

OptionsList.propTypes = {
  options: PropTypes.array,
  handleSelectOptions: PropTypes.func,
};

function OptionsList({ options, handleSelectOptions }) {
  const [selected, setSelected] = useState("");

  function handleClick(numQuestion, option) {
    setSelected(numQuestion);
    handleSelectOptions(option);
  }

  return (
    <div>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(index, option)}
          className={`button ${selected === index ? "primary" : ""}`}
        >
          {decodeURIComponent(option)}
        </button>
      ))}
    </div>
  );
}

export default OptionsList;
