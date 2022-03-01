import React from 'react';
import { Link } from 'react-router-dom';


export default function App() {
    return (
        <div className="hero-img">
            <div className="shop-div">
                <Link to="/shop" className="shop-btn">
                    <p className="shop-p">Welcome to Richard's shop</p>
                </Link>
            </div>
        </div>

    )
}