import React from 'react'
import styled from 'styled-components'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Remove from '../img/minimize.png'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { resetCart,removeProduct} from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";

const KEY = process.env.REACT_APP_STRIPE;

const Container=styled.div`
`
const Wrapper=styled.div`
    padding:20px;
    min-height: 669px;
`
const Title=styled.h1`
    font-weight:300;
    text-align:center;
`
const Top=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const TopButton=styled.button`
    padding: 10px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background-color: #e48e66;
    color: white;
`
const TopTexts=styled.div`
    margin-right: 75px;
`
const TopText=styled.span`
    text-decoration:underline;
    color: #383838;
    margin: 0px 20px;
`
const Bottom=styled.div`
    display: flex;
    justify-content:space-between;
    margin-top: 20px;
`
const Info=styled.div`
    margin-top: 20px;
    flex:3;
`
const Product=styled.div`
    display: flex;
    justify-content:space-space-around;
`
const ProductDetail=styled.div`
    flex:2;
    display:flex;
`
const Image=styled.img`
    width:200px;
`
const Details=styled.div`
    padding: 20px;
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    color: #383838;
`
const ProductName=styled.span`
`
const ProductID=styled.span`
`
const ProductSize=styled.span`
`
const PriceDetail=styled.div`
    flex:1;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
`
const ProductAmountContainer=styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const Icon= styled.img`
    width:24px;
    cursor:pointer;
    &:hover {
        transform:scale(1.1);
    }
`;
const ProductAmount=styled.div`
    font-size: 20px;
    margin: 5px;
    color: #383838;
`
const ProductPrice=styled.div`
    font-size:22px;
    font-weight:200;
    color: #383838;
`
const Hr=styled.hr`
    background-color: #e2d574;
    border: none;
    height: 1px;
`
const Summary=styled.div`
    flex:1;
    border: 0.5px solid #e2d574;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle=styled.h1`
    font-weight: 200;
`
const SummaryItem=styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content:space-between;
    font-weight: ${props=>props.type === "total" && "600"};
    font-size: ${props=>props.type === "total" && "20px"};
`
const SummaryItemText=styled.span`
`
const SummaryItemPrice=styled.span`
`
const Button=styled.button`
    width: 100%;
    padding: 10px;
    color:white;
    margin-top:10px;
    background-color:#e48e66;
    font-weight: 600;
    border: none;
    cursor: pointer;
`
const Cart = () => {
    let cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
          resetCart({ ...cart})
        );
      };

    const handleRemove = (product,price) => {
            dispatch(
                removeProduct({ ...cart,product,price})
            );
      };

    const onToken = (token) => {
    setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await userRequest.post("/checkout/payment", {
              tokenId: stripeToken.id,
              amount: (cart.total+5) * 100,
            });
            history.push("/success", {
              stripeData: res.data,
              products: cart, });
          } catch {}
        };
        stripeToken && makeRequest();
      }, [stripeToken, cart.total, history]);

    return (
        <Container>
            <Navbar></Navbar>
            <Wrapper>
                <Top>
                    <Link to="/menu">
                        <TopButton>
                        Look For More Pizzas
                        </TopButton>
                    </Link>
                    <TopTexts/>
                </Top>
                <Bottom>
                    <Info>
                    {cart.products.map(product=>(
                        <Product>
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><b>Pizza:</b>{product.title}</ProductName>
                                    <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Icon src={Remove} onClick={() => handleRemove(product,product.price*product.quantity)}/>
                                </ProductAmountContainer>
                                <ProductPrice>{product.price * product.quantity}$</ProductPrice>
                            </PriceDetail>
                        </Product>
                    ))}
                    <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary:</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal:</SummaryItemText>
                            <SummaryItemPrice>{cart.total}$</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Delivery Cost:</SummaryItemText>
                            <SummaryItemPrice>5$</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total:</SummaryItemText>
                            <SummaryItemPrice>{cart.total+5}$</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            shippingAddress
                            billingAddress
                            description={`Your total is $${cart.total+5}`}
                            amount={(cart.total+5) * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                        <Button>Place Order</Button>
                        </StripeCheckout>
                        <Button onClick={handleClick}>Clear Cart</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer></Footer>
        </Container>
    )
}

export default Cart
