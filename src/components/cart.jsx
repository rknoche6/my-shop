import React from 'react';

export default function Cart({ cartProducts }) {


    const ids = cartProducts.map(object => object.id)
    const filteredCart = cartProducts.filter(({ id }, index) => !ids.includes(id, index + 1));

    console.log("filteredCart", filteredCart)

    return (
        <div className="cart-container">
            This is the cart
        </div>
    )
}