import { useContext, useEffect } from "react";
import GlobalContext from "../../context";

export default function CartItems({cartProduct}){

const {cartData, setCartData} = useContext(GlobalContext);

let averageRating = 0;
let totalRating = 0;

    console.log(cartProduct)
    useEffect(()=>{
        cartProduct.reviews.map(review=>(totalRating += review.rating));
        averageRating = (totalRating /cartProduct.reviews.length).toFixed(1);
        console.log("average:",  averageRating);
    },[])

    const removeFromCart = ()=>{
        const _idToRemove = cartProduct._id;
        const filteredCart = cartData.filter(item => item._id !== cartProduct._id);
        console.log(filteredCart);
        

    }

    return(
        <div>
            <h4>Cart Items</h4>
            <div>
                <h3>{cartProduct.name}</h3>
                <h5>{cartProduct.description}</h5>
                <div className="cart-image-container">
                    {cartProduct.images.map((image, index) => (
                        <div className="cart-image-mapped-container" key={index}>
                            <img src={image} alt={`Product Image ${index + 1}`} />
                        </div>
                     ))}
                </div>
                <h4>Price: {cartProduct.price}</h4>
                <button onClick={removeFromCart}> Remove from cart</button>
            </div>
                

        </div>
    )
}