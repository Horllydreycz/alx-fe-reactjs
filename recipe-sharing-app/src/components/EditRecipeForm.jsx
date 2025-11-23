import React, { useState, useEffect } from "react";
import useRecipeStore from "./recipeStore";

const EditRecipeForm = ({ recipeId, onClose }) => {
  const recipes = useRecipeStore((state) => state.recipes);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const recipe = recipes.find((r) => r.id === recipeId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || "");
      setDescription(recipe.description || "");
      setIngredients(
        Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join(", ")
          : recipe.ingredients || ""
      );
      setInstructions(recipe.instructions || "");
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    if (!title.trim()) {
      alert("Please enter a recipe title");
      return;
    }

    // Prepare updated recipe data
    const updatedRecipe = {
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients
        .split(",")
        .map((ing) => ing.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
    };

    // Update the recipe in the store
    updateRecipe(recipeId, updatedRecipe);

    // Close the form or navigate away
    if (onClose) {
      onClose();
    }
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma-separated):</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., 2 cups flour, 1 egg, 1 cup milk"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter cooking instructions"
            rows="6"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Update Recipe
          </button>
          {onClose && (
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
