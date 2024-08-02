import './App.css';
import { RouterProvider } from 'react-router-dom';
import myRouter from './router/Layout';
import GlobalContext from './context';
import { useContext, useEffect, useState } from 'react';
// import Login from './components/Login';
import mySignupRouter from './router/SignUpLayout';
import Header from './components/Header';
import { CheckingCom } from './components/conditional';
import TransitComponent from './components/TransitComponent';

function App() {
    const [state, setState] = useState({ user: null });
    const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [order, setOrder] = useState({order:null});

    return (
        <GlobalContext.Provider value={{ state, setState, cartData, setCartData, totalAmount, setTotalAmount, order, setOrder}}>
            <div className="App">
                <TransitComponent/>
            </div>
            
        </GlobalContext.Provider>
    );
    
}

export default App;
