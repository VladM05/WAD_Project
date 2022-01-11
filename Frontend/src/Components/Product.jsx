import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useSelector } from "react-redux";
import icon from '../img/shopping-cart.png' 

const Container= styled.div`
    flex:1;
    margin:75px;
    min-width: 280px;
    height: 350px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#e2d574;
    position:relative;
`;

const Image= styled.img`
    height: 65%;
`;

const SmallContainer= styled.div`
    width:32px;
    position:absolute;
    bottom: 0;
    left: 100;
`;

const Icon= styled.img`
    width:32px;
    position:absolute;
    bottom: 20px;
    left: 100;

    &:hover {
        transform:scale(1.1);
    }
`;

const Product = ({item}) => {
    let user=useSelector((state) => state.user.currentUser);
    return (
        <Container>
            <Image src={item.img}/>
            <SmallContainer>
                <Link to={`/product/${item._id}`}>
                    {user? <Icon src={icon}/> : null}
                </Link>
            </SmallContainer>
        </Container>
    )
}

export default Product
