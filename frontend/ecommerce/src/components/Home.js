import { useContext, useEffect, useState } from "react";
import Product from "./product/Product";
import { getProducts } from "../network/network";
import GlobalContext from "../context";


export default function Home(){
    const {state, setState} = useContext(GlobalContext);
    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        console.log("user: ",state.user)
       getProductsArray(state.user);
       
    },[])

    const getProductsArray = async (token)=>{
        try{
          const data = await getProducts(token)
           console.log("products", data)
           setProducts(data);
        }
        catch(err){
            console.error(err);
        }
    }
 
    return(
        <div>
            <h1>Home</h1>
           {products.map((product)=>(
            <div style={{border:'1px solid black'}}>
            <Product product = {product}/>
            </div>
           ))}
          
        </div>
    )
}

