import './App.css';
import { RouterProvider } from 'react-router-dom';
import myRouter from './router/Layout';
import GlobalContext from './context';
import { useContext, useEffect, useState } from 'react';
// import Login from './components/Login';
import mySignupRouter from './router/SignUpLayout';
import Header from './components/Header';
import { CheckingCom } from './components/conditional';

function App() {
    const [state, setState] = useState({ user: null });
    const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    return (
        <GlobalContext.Provider value={{ state, setState, cartData, setCartData, totalAmount, setTotalAmount}}>
            
            <CheckingCom />
            
        </GlobalContext.Provider>
    );
    
}

export default App;
