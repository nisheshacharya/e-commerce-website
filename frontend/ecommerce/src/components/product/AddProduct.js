import React, { useState } from "react";
import "../../styles/Style.css";
import Header from "../Header";
import { addProduct } from "../../network/network";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const [currentImage, setCurrentImage] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        setCurrentImage(reader.result);
        newImages.push(reader.result);
        setProductData({ ...productData, images: newImages });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(productData, token);

    console.log("Product Data:", productData);

    setProductData({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      image: null,
    });
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="add-product-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={parseFloat(productData.price)}
              onChange={handleChange}
            />
          </label>

          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
            />
          </label>

          <label>
            Category:
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
          </label>

          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <div>{currentImage !== "" && <img src={currentImage}></img>}</div>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}
