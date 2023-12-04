import { useContext, useEffect, useState } from "react";
import Product from "./product/Product";
import { getProducts } from "../network/network";
import GlobalContext from "../context";
import Header from "./Header";


export default function Home(){
    const {state, setState, test, setTest} = useContext(GlobalContext);
    const [products, setProducts] = useState([]);
    // console.log("test from home:", test)
    
    useEffect(()=>{
        // console.log("user: ",state.user)
       getProductsArray(state.user);
       
    },[])

    const getProductsArray = async (token)=>{
        try{
          const res = await getProducts(token)
        //    console.log("products", res.data)
           setProducts(res.data);
        }
        catch(err){
            console.error(err);
        }
    }
 
    return(
        
        <div>
             <Header/>
            <h1>Home</h1>
           {products.map((product)=>(
            <div style={{border:'1px solid black'}}>
            <Product product = {product}/>
            </div>
           ))}
           </div>
        
    
    )
}

