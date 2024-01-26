import { useContext, useEffect, useState } from "react";
import Product from "./product/Product";
import { getProducts } from "../network/network";
import GlobalContext from "../context";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LocalContext from "../context/localContext";
import Footer from "./Footer";

export default function Home() {
  const { state, setState, test, setTest } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [productsCopy, setProductsCopy] = useState([]);

  const role = jwtDecode(localStorage.getItem("user")).role;
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user === null) {
      setState({ user: localStorage.getItem("user") });
      console.log("state saved");
    }
    getProductsArray(state.user);
    // console.log("state: ", state.user);
  }, []);

  const getProductsArray = async () => {
    try {
      const res = await getProducts();

      const unfiltered = res.data;
      const filtered = filterDeleated(unfiltered);

      setProducts(filtered);
      setProductsCopy(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const filterDeleated = (products) => {
    return products.filter((product) => !product.deleted);
  };

  const sortBy = (event) => {
    console.log("selected");
    console.log(event.target.value);

    if (event.target.value === "Name") {
      const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
      // console.log(sorted);
      setProducts(sorted);
    }
    if (event.target.value === "Price") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setProducts(sorted);
      console.log(sorted);
    }
    if (event.target.value === "Category") {
      const sorted = [...products].sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setProducts(sorted);
    }
  };

  return (
    <LocalContext.Provider value={{ products, setProducts, productsCopy }}>
      <div className="background">
        <Header />
        <div className="heading-div">
          <h1 style={{ color: "maroon" }}>
            {" "}
            <i> Happy Holidays! here is what we have for you... </i>{" "}
          </h1>
          {role === "admin" && (
            <button onClick={() => navigate("/addproduct")}>Add Product</button>
          )}
        </div>
        <div className="select-button">
          Sort By:{" "}
          <select onChange={sortBy}>
            <option></option>
            <option>Price</option>
            <option>Name</option>
            <option>Category</option>
          </select>
        </div>
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <Product product={product} isAdmin={role === "admin"} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </LocalContext.Provider>
  );
}
