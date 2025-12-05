import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json)
      .then((data) => {
        const foundRecipe = data.find((item) => item.id === Number(id));
        setRecipe(foundRecipe);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10">Loading recipe...</p>;

    return (
      <div className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-5">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />
        <h2 className="text-2xl font-semibold mt-6 mb-3">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Instructions</h2>
        <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
        <a
          href="/"
          className="inline-block mt-8 text-blue-600 hover:underline text-lg"
        >
          ← Back to Home
        </a>
      </div>
    );
  }
}
export default RecipeDetail;
