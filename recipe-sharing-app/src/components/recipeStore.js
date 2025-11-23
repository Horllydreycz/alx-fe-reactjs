import create from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // Update an existing recipe
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  // Delete a recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  // Set all recipes (useful for initial load or reset)
  setRecipes: (recipes) => set({ recipes }),

  // Set search term
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Filter recipes based on search term
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          (recipe.description &&
            recipe.description
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase())) ||
          (recipe.ingredients &&
            (Array.isArray(recipe.ingredients)
              ? recipe.ingredients.some((ing) =>
                  ing.toLowerCase().includes(state.searchTerm.toLowerCase())
                )
              : recipe.ingredients
                  .toLowerCase()
                  .includes(state.searchTerm.toLowerCase())))
      ),
    })),

  // Favorites functionality
  favorites: [],

  // Add recipe to favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  // Remove recipe from favorites
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Recommendations
  recommendations: [],

  // Generate personalized recommendations based on favorites
  generateRecommendations: () =>
    set((state) => {
      // If user has no favorites, recommend random popular recipes
      if (state.favorites.length === 0) {
        const randomRecipes = state.recipes
          .filter((recipe) => !state.favorites.includes(recipe.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        return { recommendations: randomRecipes };
      }

      // Get favorite recipes to analyze
      const favoriteRecipes = state.recipes.filter((recipe) =>
        state.favorites.includes(recipe.id)
      );

      // Extract common ingredients from favorites
      const ingredientCounts = {};
      favoriteRecipes.forEach((recipe) => {
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach((ingredient) => {
            const normalizedIngredient = ingredient.toLowerCase().trim();
            ingredientCounts[normalizedIngredient] =
              (ingredientCounts[normalizedIngredient] || 0) + 1;
          });
        }
      });

      // Find recipes with similar ingredients that aren't already favorites
      const recommendedRecipes = state.recipes
        .filter((recipe) => !state.favorites.includes(recipe.id))
        .map((recipe) => {
          let score = 0;
          if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach((ingredient) => {
              const normalizedIngredient = ingredient.toLowerCase().trim();
              score += ingredientCounts[normalizedIngredient] || 0;
            });
          }
          return { ...recipe, score };
        })
        .filter((recipe) => recipe.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      // If not enough recommendations, add some random ones
      if (recommendedRecipes.length < 3) {
        const additionalRecipes = state.recipes
          .filter(
            (recipe) =>
              !state.favorites.includes(recipe.id) &&
              !recommendedRecipes.find((r) => r.id === recipe.id)
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 5 - recommendedRecipes.length);

        return {
          recommendations: [...recommendedRecipes, ...additionalRecipes],
        };
      }

      return { recommendations: recommendedRecipes };
    }),
}));

export default useRecipeStore;
