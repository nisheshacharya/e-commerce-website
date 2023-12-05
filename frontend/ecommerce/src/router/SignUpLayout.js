import {createBrowserRouter} from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Cart from '../components/Cart/Cart';
import OrderList from '../components/orders/OrderList';
import CheckOut from '../components/checkOut';

const mySignupRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/cart",
        element: <Cart />
    },
    {   path: "**",
        element: <Login/>
    },
    {   
        path: "order",
        element: <OrderList/>
    },
    {
        path: "checkout",
        element: <CheckOut/>
    }
]);


export default mySignupRouter;

