import React from "react";
import { useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    // Confirm before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );

    if (confirmDelete) {
      // Delete the recipe from the store
      deleteRecipe(recipeId);

      // Navigate back to the recipes list or home page
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="delete-recipe-button"
      style={{
        backgroundColor: "#dc3545",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
