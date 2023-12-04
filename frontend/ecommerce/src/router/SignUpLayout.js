import {createBrowserRouter} from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Cart from '../components/Cart/Cart';
import OrderList from '../components/orders/OrderList';

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
    }
]);


export default mySignupRouter;

