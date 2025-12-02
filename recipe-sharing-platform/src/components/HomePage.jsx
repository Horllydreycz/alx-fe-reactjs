import { useState, useEffect } from "react";
function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData(params) {
      try {
        const response = await fetch("./data.json");
        if (!response.ok) {
          throw new Error("Failed to load data");
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  return <div></div>;
}
export default HomePage;
