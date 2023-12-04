import {createBrowserRouter} from 'react-router-dom'
import Home from '../components/Home'
import Signup from '../components/Signup'
import WriteReview from '../components/review/WriteReview'
import Cart from '../components/Cart/Cart'
import OrderList from '../components/orders/OrderList'
import OrderSummery from '../components/orders/OrderSummery'

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "home",
        element: <div>HELLO</div>
    },
    {
        path: "signup",
        element: <Cart/>
    },
    {
        path: "cart",
        exact: false,
        element: <Cart/>
    },
    {   
        path: "order",
        element: <OrderSummery/>
    }
]);

export default myRouter;
