import React from 'react'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { useSelector } from "react-redux";

const Home = () => {
    const user=useSelector((state) => state.user.currentUser);
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Footer></Footer>
        </div>
    )
}

export default Home

