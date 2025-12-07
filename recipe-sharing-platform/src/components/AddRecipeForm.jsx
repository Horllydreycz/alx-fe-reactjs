import { useState } from "react";

function AddRecipeForm() {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");

    const newRecipe = { id: Date.now(), title, ingredients, steps };
  };
  console.log("Submitted Recipe:", newRecipe);
  setRecipeTitle("");
  setIngredients("");
  setSteps("");

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add a New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Recipe Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ingredients</label>
          <textarea
            className="w-full border p-2 rounded h-28"
            placeholder="List the ingredients..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Preparation Steps</label>
          <textarea
            className="w-full border p-2 rounded h-32"
            placeholder="Describe how to prepare the recipe..."
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
export default AddRecipeForm;
