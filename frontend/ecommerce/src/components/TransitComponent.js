import { RouterProvider, useNavigate } from "react-router-dom";
import mySignupRouter from "../router/SignUpLayout";
import myRouter from "../router/Layout";
import GlobalContext from "../context";
import { useContext } from "react";


export default function TransitComponent(){
    const {state, setState} = useContext(GlobalContext);
    const myToken = localStorage.getItem("user");
    console.log("myToken: ", myToken);
    return(
        <div>
             {myToken ? (
        
        <RouterProvider router= {myRouter} />
      ) : (
        <RouterProvider router={mySignupRouter} />
      )}
        </div>
    )
}