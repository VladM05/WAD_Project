import React from 'react'
import '../styles/nav.css'

import logo from '../img/pizza2.png'
import shoppingcarticon from '../img/shopping-cart.png'
import pizzaicon from '../img/pizza.png'
import { useSelector } from "react-redux";
import { logout } from '../redux/userRedux'
import { useDispatch } from "react-redux";


const Navbar = () => {
    let user=useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
          logout()
        );
    };
    return (
        <nav class="navbar">
            <div class="nav">
                <img src={logo} class="brand-logo" alt=""/>
                <div class="nav-items">
                    <div class="search">
                    </div>
                    {user && <a onClick={handleClick} href="/" target="_self">Logout</a>}
                    {user ? null : <a href="/login" target="_self">Login</a>}
                    {user ? null : <a href="/register" target="_self">Register</a> }
                    {user ? <a href="/cart" target="_self"><img src={shoppingcarticon} alt=""/></a> : null}
                </div>
            </div> 
            <ul class="links-container">
                <li class="link-item"><a href="/" target="_self" class="link">home</a></li>
                <img src={pizzaicon} alt=""/>
                <li class="link-item"><a href="/menu" target="_self" class="link">menu</a></li>
            </ul>
        </nav>
    )
}

export default Navbar