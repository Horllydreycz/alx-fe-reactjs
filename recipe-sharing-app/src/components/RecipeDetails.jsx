import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) return <p>Recipe not found!</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <button
        onClick={() => {
          deleteRecipe(recipe.id);
          navigate("/"); // go back to list after deleting
        }}
      >
        Delete Recipe
      </button>
    </div>
  );
};

export default RecipeDetails;
