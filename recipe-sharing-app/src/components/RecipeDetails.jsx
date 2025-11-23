import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const recipe = recipes.find((r) => r.id === parseInt(id));
  const isFavorite = favorites.includes(parseInt(id));

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(parseInt(id));
    } else {
      addFavorite(parseInt(id));
    }
  };

  if (!recipe) {
    return (
      <div style={styles.notFound}>
        <h2>Recipe Not Found</h2>
        <p>The recipe you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} style={styles.backButton}>
          Back to Recipes
        </button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <EditRecipeForm
        recipeId={parseInt(id)}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/")} style={styles.backButton}>
        ← Back to Recipes
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>{recipe.title}</h1>
        <button
          onClick={toggleFavorite}
          style={{
            ...styles.favoriteButton,
            backgroundColor: isFavorite ? "#dc3545" : "#28a745",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = isFavorite ? "#c82333" : "#218838";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = isFavorite ? "#dc3545" : "#28a745";
          }}
        >
          {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
      </div>

      {recipe.description && (
        <p style={styles.description}>{recipe.description}</p>
      )}

      {recipe.prepTime && (
        <div style={styles.prepTime}>
          <strong>⏱️ Preparation Time:</strong> {recipe.prepTime}
        </div>
      )}

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Ingredients</h2>
        {recipe.ingredients && (
          <ul style={styles.list}>
            {(Array.isArray(recipe.ingredients)
              ? recipe.ingredients
              : recipe.ingredients.split(",")
            ).map((ingredient, index) => (
              <li key={index} style={styles.listItem}>
                {ingredient.trim()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {recipe.instructions && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Instructions</h2>
          <p style={styles.instructions}>{recipe.instructions}</p>
        </div>
      )}

      <div style={styles.actions}>
        <button
          onClick={() => setIsEditing(true)}
          style={styles.editButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#007bff";
          }}
        >
          ✏️ Edit Recipe
        </button>
        <DeleteRecipeButton recipeId={parseInt(id)} />
      </div>
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
  notFound: {
    textAlign: "center",
    padding: "40px",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    margin: 0,
    flex: 1,
  },
  favoriteButton: {
    padding: "12px 24px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  description: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  prepTime: {
    padding: "12px",
    backgroundColor: "#e7f3ff",
    borderRadius: "4px",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#0066cc",
  },
  section: {
    marginTop: "30px",
  },
  sectionTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "15px",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    marginBottom: "8px",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    fontSize: "16px",
    paddingLeft: "30px",
    position: "relative",
  },
  instructions: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#555",
    whiteSpace: "pre-line",
  },
  actions: {
    marginTop: "40px",
    display: "flex",
    gap: "15px",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
  },
  editButton: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default RecipeDetails;
