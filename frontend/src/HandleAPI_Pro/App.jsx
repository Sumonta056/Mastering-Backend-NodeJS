import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // To store products details
  const [products, setProducts] = useState([]);

  // To Check if errors occured or not while fetching products
  const [error, setError] = useState(false);

  // wait untill all products are fetched : a simple loading function
  const [loading, setLoading] = useState(false);

  // Fetches all products as soon website startts
  useEffect(() => {
    // wait untill all products are fetched using async
    (async () => {
      // handling errors condition if error occurs in fetching products
      try {
        setLoading(true); // loading starts
        setError(false); // no response errors

        // making a api call to fetch all products
        // which will be fetched in response variable
        const response = await axios.get("/api/products");
        console.log(response.data);

        // storing all products in products
        setProducts(response.data);
        setLoading(false); // stop loading animation
      } catch (error) {
        setError(true); // error handling showing error message
        setLoading(false); // stop loading animation
      }
    })();
  }, []);

  // Shows error message when fetching failed data
  if (error) {
    return <h1> Something went wrong </h1>;
  }
  // Create a loading animation when fetching the data
  if (loading) {
    return <h1> loading...</h1>;
  }
  return (
    <>
      <h1> Chai aur API in react </h1>
      {/* {loading && <h1>Loading............</h1>} */}
      <h2> Number of Products are: {products.length}</h2>
    </>
  );
}
export default App;
