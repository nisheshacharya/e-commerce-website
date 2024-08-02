import { createBrowserRouter } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
// import Cart from "../components/Cart/Cart";
// import OrderList from "../components/orders/OrderList";
// import CheckOut from "../components/checkOut";
import Home from "../components/Home";

const mySignupRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/welcome",
    // element: <Home />,
  },
  

]);

export default mySignupRouter;
