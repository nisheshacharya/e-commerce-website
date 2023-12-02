import {createBrowserRouter} from 'react-router-dom'
import Home from '../components/Home'
import Signup from '../components/Signup'
import Login from '../components/Login'
import WriteReview from '../components/review/WriteReview'

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
   
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "login",
        element: <Login/>
    },

])

export default myRouter;