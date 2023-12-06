import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";

import Cart from "../components/Cart/Cart";

import OrderSummery from "../components/orders/OrderSummery";
import CheckOut from "../components/checkOut";
import Profile from "../components/profile/Profile";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
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
    path: "order",
    element: <OrderSummery />,
  },
  {
    path: "checkout",
    element: <CheckOut />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

export default myRouter;
