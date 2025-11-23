import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Initialize filtered recipes on mount
  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  // Determine which recipes to display
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  if (displayRecipes.length === 0 && searchTerm) {
    return (
      <div style={styles.noResults}>
        <p>No recipes found matching "{searchTerm}"</p>
        <p>Try adjusting your search terms</p>
      </div>
    );
  }

  if (displayRecipes.length === 0) {
    return (
      <div style={styles.noResults}>
        <p>No recipes available yet.</p>
        <p>Add your first recipe to get started!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {searchTerm && (
        <p style={styles.resultCount}>
          Found {displayRecipes.length} recipe
          {displayRecipes.length !== 1 ? "s" : ""}
        </p>
      )}
      <div style={styles.grid}>
        {displayRecipes.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            <Link to={`/recipe/${recipe.id}`} style={styles.link}>
              <h3 style={styles.title}>{recipe.title}</h3>
              {recipe.description && (
                <p style={styles.description}>{recipe.description}</p>
              )}
              {recipe.ingredients && (
                <div style={styles.ingredients}>
                  <strong>Ingredients:</strong>
                  <p>
                    {Array.isArray(recipe.ingredients)
                      ? recipe.ingredients.slice(0, 3).join(", ")
                      : recipe.ingredients.substring(0, 50)}
                    {((Array.isArray(recipe.ingredients) &&
                      recipe.ingredients.length > 3) ||
                      (!Array.isArray(recipe.ingredients) &&
                        recipe.ingredients.length > 50)) &&
                      "..."}
                  </p>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  resultCount: {
    marginBottom: "15px",
    fontSize: "14px",
    color: "#666",
    fontStyle: "italic",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "20px",
    color: "#333",
  },
  description: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "10px",
    lineHeight: "1.4",
  },
  ingredients: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#555",
  },
  noResults: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#666",
  },
};

export default RecipeList;
