import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Get full recipe objects for favorited IDs
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean); // Remove any undefined values

  if (favoriteRecipes.length === 0) {
    return (
      <div style={styles.emptyState}>
        <h2 style={styles.title}>My Favorites</h2>
        <p style={styles.emptyText}>You haven't added any favorites yet.</p>
        <p style={styles.emptySubtext}>
          Browse recipes and click the heart icon to save your favorites!
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Favorites ({favoriteRecipes.length})</h2>
      <div style={styles.grid}>
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            <Link to={`/recipe/${recipe.id}`} style={styles.link}>
              <h3 style={styles.recipeTitle}>{recipe.title}</h3>
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
            <button
              onClick={() => removeFavorite(recipe.id)}
              style={styles.removeButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#c82333";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#dc3545";
              }}
            >
              ❤️ Remove from Favorites
            </button>
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
  emptyState: {
    padding: "40px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  emptyText: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "10px",
  },
  emptySubtext: {
    fontSize: "14px",
    color: "#999",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "2px solid #e74c3c",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  recipeTitle: {
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
  removeButton: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default FavoritesList;
