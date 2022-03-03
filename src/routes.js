import { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/app";
import Shop from "./components/shop";
import Nav from "./components/nav";
import Cart from "./components/cart";
import Product from './components/product';

export default function Routes() {

    const [cartProducts, setCartProducts] = useState([]);

    function sendToCart(productArray) {
        setCartProducts(productArray)
    }

    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/shop" render={() => (<Shop productArray={sendToCart} resendPrevProducts={cartProducts} />)} />
                <Route exact path="/cart" render={() => (<Cart cartProducts={cartProducts} />)} />
                <Route exact path="/product" component={Product} />
            </Switch>
        </BrowserRouter>
    )
}