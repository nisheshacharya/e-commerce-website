import React, { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import myRouter from "../router/Layout";
import mySignupRouter from "../router/SignUpLayout";
import GlobalContext from "../context";
import Login from "./Login";
export const CheckingCom = () => {
  const { state, setState } = useContext(GlobalContext);

  const res = localStorage.getItem("user");
  console.log("Token from local storage: ", res);
  return (
    <div>
    
      {res ? (
        
        <RouterProvider router={ res ? myRouter : <Login />} />
      ) : (
        <RouterProvider router={mySignupRouter} />
      )}
    </div>
  );
};
