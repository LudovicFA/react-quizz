import PropTypes from "prop-types";
import Categories from "./Categories";
import Difficulties from "./Difficuties";

Header.propTypes = {
  handleChangeCategory: PropTypes.func,
  handleChangeDifficulty: PropTypes.func,
  handleCreate: PropTypes.func,
};

function Header({
  handleChangeCategory,
  handleChangeDifficulty,
  handleCreate,
}) {
  return (
    <div>
      <Categories handleChangeCategory={handleChangeCategory} />
      <Difficulties handleChangeDifficulty={handleChangeDifficulty} />
      <button id="createBtn" className="button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default Header;
