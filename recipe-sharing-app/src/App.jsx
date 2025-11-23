import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import AddRecipeForm from "./components/AddRecipeForm";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import useRecipeStore from "./components/recipeStore";

function App() {
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  // Initialize with sample recipes
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with eggs, cheese, and bacon",
        ingredients: [
          "400g spaghetti",
          "200g bacon",
          "4 eggs",
          "100g Parmesan cheese",
          "Black pepper",
          "Salt",
        ],
        instructions:
          "Cook pasta according to package directions. While pasta cooks, fry bacon until crispy. Beat eggs with Parmesan. Drain pasta, reserving 1 cup pasta water. Toss hot pasta with bacon, then quickly stir in egg mixture off heat. Add pasta water to create creamy sauce. Season with pepper and serve immediately.",
        prepTime: "30 minutes",
      },
      {
        id: 2,
        title: "Chicken Stir Fry",
        description: "Quick and healthy Asian-inspired chicken dish",
        ingredients: [
          "500g chicken breast",
          "2 bell peppers",
          "1 onion",
          "Soy sauce",
          "Garlic",
          "Ginger",
          "Sesame oil",
        ],
        instructions:
          "Cut chicken into bite-sized pieces. Slice vegetables. Heat wok over high heat. Stir fry chicken until golden. Add vegetables and stir fry 3-4 minutes. Add sauce mixture and toss to coat. Serve over rice.",
        prepTime: "20 minutes",
      },
      {
        id: 3,
        title: "Chocolate Chip Cookies",
        description: "Soft and chewy homemade cookies",
        ingredients: [
          "2 cups flour",
          "1 cup butter",
          "1 cup sugar",
          "2 eggs",
          "2 cups chocolate chips",
          "Vanilla extract",
          "Baking soda",
        ],
        instructions:
          "Preheat oven to 350°F. Cream butter and sugar. Beat in eggs and vanilla. Mix in flour and baking soda. Fold in chocolate chips. Drop spoonfuls onto baking sheet. Bake 12 minutes until edges are golden.",
        prepTime: "45 minutes",
      },
      {
        id: 4,
        title: "Caesar Salad",
        description:
          "Fresh and crispy romaine lettuce with classic Caesar dressing",
        ingredients: [
          "Romaine lettuce",
          "Parmesan cheese",
          "Croutons",
          "Caesar dressing",
          "Black pepper",
          "Lemon juice",
        ],
        instructions:
          "Wash and chop romaine lettuce. Toss with Caesar dressing. Top with shaved Parmesan and croutons. Add fresh black pepper and squeeze of lemon. Serve immediately.",
        prepTime: "15 minutes",
      },
      {
        id: 5,
        title: "Beef Tacos",
        description: "Flavorful Mexican-style beef tacos with fresh toppings",
        ingredients: [
          "500g ground beef",
          "Taco shells",
          "Lettuce",
          "Tomatoes",
          "Cheese",
          "Sour cream",
          "Taco seasoning",
          "Onion",
        ],
        instructions:
          "Brown ground beef with taco seasoning. Warm taco shells. Chop lettuce, tomatoes, and onions. Assemble tacos with beef and desired toppings. Serve with sour cream and salsa.",
        prepTime: "25 minutes",
      },
      {
        id: 6,
        title: "Vegetable Curry",
        description:
          "Aromatic and spicy vegetarian curry with mixed vegetables",
        ingredients: [
          "2 potatoes",
          "1 cauliflower",
          "2 carrots",
          "Curry powder",
          "Coconut milk",
          "Garlic",
          "Ginger",
          "Onion",
        ],
        instructions:
          "Dice vegetables. Sauté onion, garlic, and ginger. Add curry powder and vegetables. Pour in coconut milk and simmer 20 minutes until vegetables are tender. Serve with rice or naan.",
        prepTime: "40 minutes",
      },
    ];

    setRecipes(sampleRecipes);
    // Generate initial recommendations
    setTimeout(() => generateRecommendations(), 100);
  }, [setRecipes, generateRecommendations]);

  return (
    <Router>
      <div style={styles.app}>
        <header style={styles.header}>
          <h1 style={styles.logo}>
            <Link to="/" style={styles.logoLink}>
              🍳 Recipe Sharing App
            </Link>
          </h1>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
            <Link to="/favorites" style={styles.navLink}>
              ❤️ My Favorites
            </Link>
            <Link to="/add" style={styles.navLink}>
              + Add Recipe
            </Link>
          </nav>
        </header>

        <main style={styles.main}>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <SearchBar />
                  <RecipeList />
                  <RecommendationsList />
                </div>
              }
            />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/add" element={<AddRecipeForm />} />
          </Routes>
        </main>

        <footer style={styles.footer}>
          <p>&copy; 2024 Recipe Sharing App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: "0 0 10px 0",
    fontSize: "28px",
  },
  logoLink: {
    color: "white",
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  main: {
    flex: 1,
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "20px",
  },
  footer: {
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
  },
};

export default App;
