import { useContext, useEffect, useState } from "react";
import Product from "./product/Product";
import { getProducts } from "../network/network";
import GlobalContext from "../context";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LocalContext from "../context/localContext";

export default function Home() {
  const { state, setState, test, setTest } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);

  const role = jwtDecode(localStorage.getItem("user")).role;
  const navigate = useNavigate();

  useEffect(() => {
    getProductsArray(state.user);
    console.log("state: ", state.user);
  }, []);

  const getProductsArray = async (token) => {
    try {
      const res = await getProducts(token);

      const unfiltered = res.data;
      const filtered = filterDeleated(unfiltered);

      setProducts(filtered);
      console.log("products: ", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterDeleated = (products) => {
    return products.filter((product) => !product.deleted);
  };

  return (
    <LocalContext.Provider value={{ products, setProducts }}>
      <div>
        <Header />
        <div className="heading-div">
          <h1>Home</h1>
          {role === "admin" && (
            <button onClick={() => navigate("/addproduct")}>Add Product</button>
          )}
        </div>
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <Product product={product} isAdmin={role === "admin"} />
            </div>
          ))}
        </div>
      </div>
    </LocalContext.Provider>
  );
}
