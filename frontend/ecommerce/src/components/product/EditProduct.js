import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../network/network";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

export default function EditProduct() {
  const token = localStorage.getItem("user");
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    deleted: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(productId);
        console.log("response", response);
        setProductDetails(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(
        productId,
        productDetails,
        token
      );

      console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
    alert("Update successful");
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="edit-product-container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={productDetails.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={productDetails.price}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={productDetails.quantity}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Deleted:
            <select
              name="deleted"
              value={productDetails.deleted}
              onChange={handleChange}
            >
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
          </label>
          <br />
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
}
