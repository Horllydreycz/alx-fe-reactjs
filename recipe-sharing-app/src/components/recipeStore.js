import create from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],

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

  // Search/filter recipes
  searchRecipes: (searchTerm) =>
    set((state) => ({
      filteredRecipes: state.recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),

  filteredRecipes: [],

  // Favorites functionality
  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Recommendations
  recommendations: [],

  generateRecommendations: () =>
    set((state) => {
      // Simple recommendation logic based on favorites
      const recommended = state.recipes
        .filter((recipe) => !state.favorites.includes(recipe.id))
        .slice(0, 5);

      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
