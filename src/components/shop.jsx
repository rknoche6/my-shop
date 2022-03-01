import React, { useEffect, useState } from 'react';
import LoadingScreen from './loadingScreen';
import ComponentCard from './componentCard';

export default function Shop({ productArray }) {

    const [loading, setLoading] = useState(true);
    const [fetchedData, setFetchedData] = useState(null);

    function addToCart(products) {
        productArray(products)
        console.log("Shop", products)
    }

    useEffect(() => {
        async function fetchProducts() {
            const url = "https://fakestoreapi.com/products";
            const response = await fetch(url);
            const data = await response.json();

            const filteredProducts = await data.filter((product) => {
                return (
                    product.category === "men's clothing" || product.category === "women's clothing"
                )
            })


            if (fetchedData === null) {
                setFetchedData(filteredProducts)
            }
            setLoading(false);
        }
        fetchProducts();
    }, [fetchedData])


    return (
        <div className="shop-container">
            {loading ? <LoadingScreen /> : <ComponentCard data={fetchedData} onAdd={addToCart} />}
        </div>
    )
}