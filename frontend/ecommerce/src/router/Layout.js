import { createBrowserRouter } from "react-router-dom";
//import Home from "../components/Home";

import Cart from "../components/Cart/Cart";

//import OrderSummery from "../components/orders/OrderSummery";
import CheckOut from "../components/checkOut";
import Profile from "../components/profile/Profile";
//import OrderList from "../components/orders/OrderList";
import AddReview from "../components/review/AddReview";
import EditProfile from "../components/profile/EditProfile";
import AddProduct from "../components/product/AddProduct";
import EditProduct from "../components/product/EditProduct";
import Home from "../components/Home";
import OrderList from "../components/Orders/OrderList";

const myRouter = createBrowserRouter([
 
  {
    path: "home",
    element: <div>HELLO</div>,
  },
  {
    path: "signup",
    element: <Cart />,
  },
  {
    path: "cart",
    exact: false,
    element: <Cart />,
  },
  
  {
    path: "checkout",
    element: <CheckOut />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "editprofile",
    element: <EditProfile />,
  },
  {
    path: "orders",
    element: <OrderList />,
  },
  {
    path: "product/addreview",
    element: <AddReview />,
  },
  {
    path: "addproduct",
    element: <AddProduct />,
  },
  {
    path:"edit-product/:productId",
    element: <EditProduct/> 
  },
  {path: "/",
    element: <Home/>
  }

]);

export default myRouter;
