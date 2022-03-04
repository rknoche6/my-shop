import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ComponentCard({ data, onAdd, resendPrevProducts }) {

    const [addProduct, setAddProduct] = useState([]);

    useEffect(() => {
        if (addProduct.length !== 0) {
            onAdd(addProduct);
        }
        return
    })

    function createComponentCard(product) {
        function handleAdd() {
            setAddProduct((prev) => {
                if (prev.includes(product) && resendPrevProducts.length === 0) {
                    return prev;
                } else if (!prev.includes(product) && resendPrevProducts.length === 0) {
                    return [...prev, product];
                } else if (prev.length === 0 && resendPrevProducts.includes(product)) {
                    return resendPrevProducts;
                } else if (prev.length === 0 && !resendPrevProducts.includes(product)) {
                    return [...resendPrevProducts, product];
                } else if (prev.includes(product) && resendPrevProducts.includes(product)) {
                    return prev;
                } else if (prev.includes(product) && !resendPrevProducts.includes(product)) {
                    return prev;
                } else if (!prev.includes(product) && resendPrevProducts.includes(product)) {
                    return resendPrevProducts;
                } else if (!prev.includes(product) && !resendPrevProducts.includes(product)) {
                    return [...prev, product];
                }
            })
        }

        return (
            <div className="product-card" key={product.id}>
                <Link to={{ pathname: "/product", state: { product: product } }} className="product-link">
                    <img src={product.image} alt={product.title} className="product-img" />
                    <p className="product-title">{product.title.length < 30 ? product.title : `${product.title.slice(0, 30)}...`}</p>
                    <div className="product-additional">
                        {product.category === "men's clothing" ? <p className="product-gender">Men's</p> : <p className="product-gender">Women's</p>}
                        <p className="product-price">$ {product.price}</p>
                    </div>
                </Link>
                <button className="product-add" onClick={handleAdd}>Add</button>
            </div>
        )
    }


    return (
        <div className="component-card">
            {data.map(createComponentCard)}
        </div>
    )
}