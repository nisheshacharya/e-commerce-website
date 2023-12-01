import {createBrowserRouter} from 'react-router-dom'
import Homee from '../components/Home'
import Signup from '../components/Signup'
import Login from '../components/Login'

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Homee/>
    },

    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "login",
        element: <Login/>
    }
])

export default myRouter;