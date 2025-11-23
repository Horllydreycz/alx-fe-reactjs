import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form
    if (!title.trim()) {
      alert("Please enter a recipe title");
      return;
    }

    // Create new recipe object
    const newRecipe = {
      id: Date.now(), // Simple ID generation
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients
        .split(",")
        .map((ing) => ing.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
      prepTime: prepTime.trim(),
    };

    // Add recipe to store
    addRecipe(newRecipe);

    // Navigate to the new recipe's detail page
    navigate(`/recipe/${newRecipe.id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add New Recipe</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Grandma's Apple Pie"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of your recipe"
            rows="3"
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="prepTime" style={styles.label}>
            Preparation Time
          </label>
          <input
            type="text"
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="e.g., 30 minutes"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="ingredients" style={styles.label}>
            Ingredients (comma-separated) *
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., 2 cups flour, 1 egg, 1 cup milk, 2 tbsp sugar"
            rows="5"
            style={styles.textarea}
          />
          <small style={styles.hint}>
            Separate each ingredient with a comma
          </small>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="instructions" style={styles.label}>
            Instructions *
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Step-by-step cooking instructions"
            rows="8"
            style={styles.textarea}
          />
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.submitButton}>
            ✅ Add Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "border-color 0.3s",
  },
  hint: {
    fontSize: "13px",
    color: "#666",
    marginTop: "5px",
    fontStyle: "italic",
  },
  actions: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },
  submitButton: {
    padding: "14px 30px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "14px 30px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AddRecipeForm;
