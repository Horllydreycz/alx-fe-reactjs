import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import WelcomeMessage from "./components/WelcomeMessage";
import UserContext from "./components/UserContext";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <WelcomeMessage />
      <MainContent />
      <Footer />
      <UserContext.Provider
        value={{
          name: "Alice",
          age: "25",
          bio: "Loves hiking and photography",
        }}
      >
        <UserProfile />
      </UserContext.Provider>
    </>
  );
}

export default App;
