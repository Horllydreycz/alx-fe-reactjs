import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites.length, generateRecommendations]);

  const handleAddFavorite = (recipeId, event) => {
    event.preventDefault(); // Prevent navigation when clicking the button
    addFavorite(recipeId);
    // Regenerate recommendations after adding favorite
    setTimeout(() => generateRecommendations(), 100);
  };

  if (recommendations.length === 0) {
    return (
      <div style={styles.emptyState}>
        <h2 style={styles.title}>Recommended For You</h2>
        <p style={styles.emptyText}>
          No recommendations available at the moment.
        </p>
        <p style={styles.emptySubtext}>
          Add some favorites to get personalized recommendations!
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Recommended For You</h2>
        <button
          onClick={generateRecommendations}
          style={styles.refreshButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#007bff";
          }}
        >
          🔄 Refresh Recommendations
        </button>
      </div>
      <p style={styles.subtitle}>Based on your favorites and preferences</p>
      <div style={styles.grid}>
        {recommendations.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            <Link to={`/recipe/${recipe.id}`} style={styles.link}>
              <div style={styles.badge}>Recommended</div>
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
              {recipe.prepTime && (
                <p style={styles.prepTime}>⏱️ {recipe.prepTime}</p>
              )}
            </Link>
            <button
              onClick={(e) => handleAddFavorite(recipe.id, e)}
              style={styles.favoriteButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#28a745";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#28a745";
              }}
            >
              ❤️ Add to Favorites
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
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    marginTop: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    flexWrap: "wrap",
    gap: "10px",
  },
  title: {
    fontSize: "28px",
    color: "#333",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  refreshButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  emptyState: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    marginTop: "20px",
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
    border: "2px solid #007bff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#007bff",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  recipeTitle: {
    margin: "0 0 10px 0",
    fontSize: "20px",
    color: "#333",
    paddingRight: "100px",
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
  prepTime: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#007bff",
    fontWeight: "bold",
  },
  favoriteButton: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default RecommendationsList;
