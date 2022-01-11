import React from 'react'

import sign from '../img/logo.png'
import '../styles/banner.css'

const Banner = () => {
    return (
        <header class="hero-section">
            <div class="content">
                <img src={sign} class="logo" alt=""/>
                <p class="sub-heading">Monday to Saturday<br />From 10:00 to 23:00</p>
                <p class="sub-heading">Phone number:<br />0101010101</p>
            </div>
        </header>
    )
}

export default Banner
