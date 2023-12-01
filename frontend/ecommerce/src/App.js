import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import {RouterProvider} from 'react-router-dom';
import myRouter from './router/Layout'




function App() {
  return (
    <div className="App">

      <RouterProvider router={myRouter}/>
     {/* <Signup/> */}
      
    </div>
  );
}

export default App;
