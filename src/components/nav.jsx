import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <p className="logo">Online Shop</p>
            <ul className="nav-links">
                <Link to="/" className="nav-items">
                    <li>Home</li>
                </Link>
                <Link to="/shop" className="nav-items">
                    <li>Shop</li>
                </Link>
                <Link to="/cart" className="nav-items">
                    <li>Cart</li>
                </Link>
            </ul>
        </nav>
    )
}