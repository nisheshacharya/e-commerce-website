import './App.css';
import { RouterProvider } from 'react-router-dom';
import myRouter from './router/Layout';
import GlobalContext from './context';
import { useContext, useEffect, useState } from 'react';
import Login from './components/Login';
import mySignupRouter from './router/SignUpLayout';
import Header from './components/Header';

function App() {
    const [state, setState] = useState({ user: null });

    useEffect(() => {
        const res = localStorage.getItem("user");
        console.log("from local storage: ",res )
        if (res) {
            setState({ ...state, user: res });
        }
    }, [state]);

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            <div className="App">
                {/* <Header/> */}
               {state.user? <RouterProvider router={myRouter}/>: <RouterProvider router={mySignupRouter}/>}
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
