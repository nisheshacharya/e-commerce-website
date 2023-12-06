import { useContext, useEffect, useState } from "react";
import Product from "./product/Product";
import { getProducts } from "../network/network";
import GlobalContext from "../context";
import Header from "./Header";


export default function Home(){
    const {state, setState, test, setTest} = useContext(GlobalContext);
    const [products, setProducts] = useState([]);
   
    useEffect(()=>{
       getProductsArray(state.user);
       console.log("state: ", state.user);
    },[])

    const getProductsArray = async (token)=>{
        try{
          const res = await getProducts(token)
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

