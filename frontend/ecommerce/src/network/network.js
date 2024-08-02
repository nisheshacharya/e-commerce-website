import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";


//login
export async function login(email, password) {
  const url = "http://localhost:3001/login";

  try {
    const res = await axios.post(url, { email, password });
    
    console.log("email: ", email , " password: ", password);
    console.log("res: ", res);
    return res.data;
  } catch (err) {
    console.error(err);
    return;
  }
}

//signup

export async function signup(name, email, password) {
  const url = "http://localhost:3001/signup";
  console.log(name, email, password);

  try {
    const res = await axios.post(url, { name, email, password });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error occurred during signup:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || "Signup failed. Please try again." };
  }
}


//Get Products

export async function getProducts(token) {
  const url = "http://localhost:3001/products";

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      // console.log("res.data:-------", res.data);
      return res.data;
    }
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function getProductById(productId) {
  const url = "http://localhost:3001/products";

  try {
    const res = await axios.get(`${url}/${productId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching product from id", error);
    return null;
  }
}

export async function getProductByName(name) {
  const url = "http://localhost:3001/products/results";

  try {
    const res = await axios.get(`${url}/${name}`);

    console.log("res: ", res);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching product from id", error);
    return null;
  }
}

// get user by ID

export async function getUserName(userId) {
  const url = "http://localhost:3001/users";

  try {
    const res = await axios.get(`${url}/${userId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching user from id", error);
    return null;
  }
}

//get all orders

export async function getAllOrders(token) {
  const url = "http://localhost:3001/orders/";
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error getting orders", error);
    return null;
  }
}

export async function pullOrdersByUsers(userId, token) {
  const url = `http://localhost:3001/orders/${userId}`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error getting orders");
    return null;
  }
}

// add order

export async function addOrder(order, token) {
  const url = "http://localhost:3001/orders/";

  try {
    const res = await axios.post(url, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding order");
    return null;
  }
}

// Add review

export async function addReview(productId, review, token) {
  const url = `http://localhost:3001/products/add-review/${productId}`;

  try {
    const res = await axios.patch(url, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding review", error);
    return null;
  }
}

// Update user profile
export async function updateProfile(newUserName, newEmail, token) {
  const url = "http://localhost:3001/users/update-profile";

  try {
    const res = await axios.patch(
      url,
      { newUserName, newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error updating profile", error);
    return null;
  }
}

// Send email
export async function sendEmail(to) {
  const url = "http://localhost:3001/email-service/send-email";

  try {
    const res = await axios.post(url, { to });
    return res.data;
  } catch (error) {
    console.error("Error sending email", error);
    return null;
  }
}

//add product
export async function addProduct(productData, token) {
  const url = "http://localhost:3001/products/add";

  try {
    const res = await axios.post(url, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error adding product", error);
    return null;
  }
}

const BASE_URL = "http://localhost:3001";

//update product
export const updateProduct = async (productId, productData, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${productId}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update product quantity
export const updateProductQuantity = async (productId, newQuantity, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${productId}`,
      { quantity: newQuantity }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating product quantity:",
      error.response?.data || error.message
    );
    throw error;
  }
};

