import React from 'react'
import '../styles/footer.css'

import footerlogo from '../img/logo.webp'

const Footer = () => {
    return (
        <footer>
        <img src={footerlogo} class="logo" alt=""/>
            <p class="info">Mircea Vlad-Mihai<br />UPT 3rd Year<br />Web Applications Design</p>
            <p class="info">Support: help@Pizzeria.com</p>
            <div class="footer-social-container">
                <div>
                    <a href="#" class="social-link">Instagram</a>
                    <a href="#" class="social-link">Facebook</a>
                    <a href="#" class="social-link">Twitter</a>
                </div>
                <div>
                    <a href="#" class="social-link">terms & services</a>
                    <a href="#" class="social-link">Privacy page</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
