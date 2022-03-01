import React from 'react';
import { useLocation } from 'react-router';

export default function Product() {
    const location = useLocation();
    const { product } = location.state

    return (
        <div className="product-description-container">
            <div className="product-description-left">
                <img src={product.image} alt={product.title} className="product-description-img" />
            </div>
            <div className="product-description-right">
                <div className="product-description-right-top">
                    <p className="product-description-title">{product.title}</p>
                </div>
                <div className="product-description-right-middle">
                    <p className="product-description-description">{product.description}</p>
                </div>
                <div className="product-description-right-bottom">
                    {product.category === "men's clothing" ? <p className="product-description-gender">Men's</p> : <p className="product-description-gender">Women's</p>}
                    <p className="product-description-price">$ {product.price}</p>
                </div>
                <button className="product-description-add">Add</button>
            </div>
        </div>
    )
}