import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients?.join("\n") || "");
      setSteps(recipe.steps?.join("\n") || "");
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recipe Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            ← Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError("Recipe title is required!");
      return;
    }
    if (!description.trim()) {
      setError("Recipe description is required!");
      return;
    }

    const updatedRecipe = {
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter((i) => i),
      steps: steps
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s),
    };

    updateRecipe(recipeId, updatedRecipe);
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate(`/recipe/${recipeId}`)}
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Recipe
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Recipe</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Recipe Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Chocolate Chip Cookies"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of your recipe"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Instructions (one step per line)
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold"
          >
            Update Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recipe/${recipeId}`)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-md font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
