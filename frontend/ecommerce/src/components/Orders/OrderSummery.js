import { useContext, useEffect, useState } from "react"
import { getAllOrders } from "../../network/network";
import GlobalContext from "../../context";


export default function OrderSummery(){
    const [orders, setOrders] = useState([]);
    const {state, setState} = useContext(GlobalContext);
    let orderData = []; 

useEffect(()=>{
  orderData =  fetchOrders(state.user);
}, [])


const fetchOrders = async (token)=>{
    try{
        const res = await getAllOrders(token);
        setOrders(res);
    }
    catch(error){
        console.error(error)
    }
}

    return(
        <div>
            <h2>Order Symmery</h2>

        </div>
    )
}