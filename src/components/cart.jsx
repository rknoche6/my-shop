import React, { useState } from 'react';

export default function Cart({ cartProducts }) {

    const ids = cartProducts.map(object => object.id)
    const [filteredCart, setFilteredCart] = useState(cartProducts.filter(({ id }, index) => !ids.includes(id, index + 1)));
    const [itemQuantityState, setItemQuantityState] = useState(1);

    function createCard(product) {
        return (
            <CreateComponentCard product={product} itemQuantity={itemQuantity} itemToDelete={deleteItem} key={product.id} />
        )
    }

    function createBillingDetails(billingDetails) {
        return (
            <CreateBillingComponent billingItem={billingDetails} itemQuantity={itemQuantityState} key={billingDetails.id} />
        )
    }

    function calculateTotal() {
        return filteredCart.reduce((acc, curr) => acc + curr.price, 0)
    }

    function deleteItem(itemId) {
        setFilteredCart(filteredCart.filter((item) => Number(item.id) !== Number(itemId)))
    }

    function itemQuantity(itemQuantity) {
        setItemQuantityState(itemQuantity)
        // console.log(itemQuantityState);
    }

    return (
        <div className="cart-container">
            {filteredCart.length === 0 ? <div className="empty-cart-div">Your Cart is Empty</div> : null}
            <div className="cart-left">
                {filteredCart.map(createCard)}
            </div>

            {filteredCart.length === 0 ? null :
                <div className="cart-right">
                    <div className="billing-heading">
                        <div className="billing-quantity">#</div>
                        <div className="billing-item">Item</div>
                        <div className="billing-price">Price</div>
                    </div>
                    {filteredCart.map(createBillingDetails)}
                    <div className="billing-total-row">
                        <div className="billing-total-heading">Total</div>
                        <div className="billing-total-amount">{calculateTotal()}</div>
                    </div>
                </div>
            }

        </div>
    )
}



export function CreateComponentCard({ product, itemToDelete, itemQuantity }) {

    const [quantity, setQuantity] = useState(1);

    // An object to pass product details to Parent Component cart.jsx
    // itemDetails({ "title": product.title, "quantity": quantity, "price": product.price });

    function decrement(e) {
        if (quantity > 1) {
            itemQuantity({ "quantity": quantity, "id": product.id, "operation": "decrease" })
            setQuantity(prev => prev - 1);
        } else if (quantity === 1) {
            // Remove if quantity is 1 will be implemented later
            const productId = e.target.id;
            itemToDelete(productId);
        }

    }
    function increment() {
        itemQuantity({ "quantity": quantity, "id": product.id, "operation": "increase" })
        return setQuantity(prev => prev + 1);
    }
    return (
        <div key={product.id} className="product-card-main">
            <div className="product-cart-card">
                <img src={product.image} alt={product.title} className="product-img" />
                <p className="product-title">{product.title.length < 30 ? product.title : `${product.title.slice(0, 30)}...`}</p>
                <div className="product-additional">
                    {product.category === "men's clothing" ? <p className="product-gender">Men's</p> : <p className="product-gender">Women's</p>}
                    <p className="product-price">$ {product.price}</p>
                </div>
            </div>
            <div className="product-quantity-div">
                <button id={product.id} key={product.id} className="quantity-button" onClick={decrement}>-</button>
                <p className="product-quantity">{quantity}</p>
                <button className="quantity-button" onClick={increment}>+</button>
            </div>
        </div>
    )
}



export function CreateBillingComponent({ billingItem, itemQuantity }) {

    if (itemQuantity.id === billingItem.id && itemQuantity.operation === "increase") {
        billingItem.quantity = (itemQuantity.quantity) + 1;

    } else if (itemQuantity.id === billingItem.id && itemQuantity.operation === "decrease") {
        billingItem.quantity = (itemQuantity.quantity) - 1;

    }

    return (
        <div className="billing-details" key={billingItem.id}>
            <div className="billing-quantity">{billingItem.quantity || 1}</div>
            <div className="billing-item">{billingItem.title.length < 30 ? billingItem.title : `${billingItem.title.slice(0, 30)}...`}</div>
            <div className="billing-price">$ {Math.round(((billingItem.price * (billingItem.quantity || 1)) + Number.EPSILON) * 100) / 100}</div>
        </div>
    )
}