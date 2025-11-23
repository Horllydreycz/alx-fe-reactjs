import React from "react";
import useRecipeStore from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <div className="search-bar" style={styles.container}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearchChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    margin: "20px 0",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s",
  },
};

export default SearchBar;
