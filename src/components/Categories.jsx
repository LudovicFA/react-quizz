import PropTypes from "prop-types";
import { useEffect, useState } from "react";

Categories.propTypes = {
  categories: PropTypes.array,
  handleChangeCategory: PropTypes.func,
};

function Categories({ handleChangeCategory }) {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(function () {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        setErrors("");

        const response = await fetch("https://opentdb.com/api_category.php");
        if (!response.ok)
          throw new Error("Something went wrong with fetching categories");

        const data = await response.json();

        setCategories(data.trivia_categories);
        setErrors("");
      } catch (err) {
        setErrors(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (isLoading) return "";

  return (
    <>
      {errors && <p>{errors}</p>}
      <select
        id="categorySelect"
        className="select"
        onChange={handleChangeCategory}
      >
        <option value="">Select a category</option>
        {!isLoading &&
          categories?.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
      </select>
    </>
  );
}

export default Categories;
