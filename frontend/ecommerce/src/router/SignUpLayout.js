import {createBrowserRouter} from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'

const mySignupRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/login",
        element: <Login/>
    }
])

export default mySignupRouter;