import { useEffect } from "react";

export default function CartItems({cartProduct}){
let averageRating = 0;
let totalRating = 0;

    console.log(cartProduct)
    useEffect(()=>{
        cartProduct.reviews.map(review=>(totalRating += review.rating));
        averageRating = totalRating /cartProduct.reviews.length;
        console.log("average:",  averageRating);
    })

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
            </div>
                

        </div>
    )
}