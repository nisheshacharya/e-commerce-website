import './App.css';
import { RouterProvider } from 'react-router-dom';
import myRouter from './router/Layout';
import GlobalContext from './context';
import { useContext, useEffect, useState } from 'react';
// import Login from './components/Login';
import mySignupRouter from './router/SignUpLayout';
import Header from './components/Header';

function App() {
    const [state, setState] = useState({ user: null });
    const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    
   

    useEffect(() => {
        const res = localStorage.getItem("user");
        // console.log("from local storage: ",res )
        if (res) {
            // console.log("inside if(res)")

            setState({ ...state, user: res });
           
        }
    }, []);

    // console.log("state from app ", state)

    

    return (
        <GlobalContext.Provider value={{ state, setState, cartData, setCartData, totalAmount, setTotalAmount}}>
            <div className="App">
                {state?.user ? <RouterProvider router={myRouter}  /> : <RouterProvider router={mySignupRouter} />}
            </div>
        </GlobalContext.Provider>
    );
    
}

export default App;
