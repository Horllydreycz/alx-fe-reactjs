import React from "react";
import { useState, useEffect } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("src/data.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading data", error));
  }, []);

  return (
    <div className="container bg">
      <h1 className="head text-3xl font-bold text-center mb-10 ">
        Recipe Sharing Platform
      </h1>
      <div>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-lg overflow-hidden hover:scale-105"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-grey-600 mt-2">{recipe.summary}</p>
              <a
                href={`/recipe/${recipe.id}`}
                className="inline-block mt-4 text-blue-600 font-medium hover:underline"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;
