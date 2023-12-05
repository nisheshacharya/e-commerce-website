import '../styles/Style.css'
export default function CheckOut() {
    return(
        <div>
            <div className="checkout-header">
                <h3>Checkout: items</h3>
            </div>
            <div className='checkout-body-container'>
                <div className="checkout-container">
                    <div className="checkout-details">
                        <div className="shipping-container">
                        <div className='index'>
                                <h4>1</h4>
                            </div>
                            <div className="shipping-container-header">
                                <h4> Shipping Address</h4>
                            </div>
                            <div className="shipping-container-body">
                                <form>
                                    <input type='text'placeholder='Street Address'/> 
                                    <input type='text'placeholder='City'/> 
                                    <input type='text'placeholder='State'/> 
                                    <input type='text' placeholder='Zip code'/>
                                    <input type='submit' value='Set Address' />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-details">
                        <div className="shipping-container">
                            <div className='index'>
                                <h4>2</h4>
                            </div>
                            <div className="shipping-container-header">
                                <h4> Payment Method</h4>
                            </div>
                            <div className="shipping-container-body">
                                <h4> Payment body container</h4>
                            </div>
                        </div>
                    </div>
                   
                </div>

                
                <div className="place-order-container">
                    <h3>Place Order</h3>
                    <button>Place order</button>
                    <div className='place-order-summery'>
                        <p>Number of items</p>
                        <p> Total Amount: </p>

                    </div>
                </div>
            </div>
        </div>
    )
} 