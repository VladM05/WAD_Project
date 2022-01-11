import React from 'react'
import styled from 'styled-components'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Add from '../img/add.png'
import Remove from '../img/minimize.png'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Container=styled.div``
const Wrapper=styled.div`
    display:flex;
    padding:50px;
    min-height: 669px;
`
const ImgContainer=styled.div`
    flex:1;
    height: 569px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#f5f5f5;
`
const Image=styled.img`
    object-fit:cover;
    height: 32vh;
`
const InfoContainer=styled.div`
    flex:1;
    padding: 0 40px;
`
const Title=styled.h1`
    font-weight:200;
`
const Description=styled.p`
    margin: 32px 0px;
`
const Price=styled.span`
    font-weight:200;
    font-size:30px;
`

const FilterContainer=styled.div`
    display:flex;
    justify-content:space-between;
    margin:32px 0px;
`
const Filter=styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle=styled.span`
    font-size: 24px;
    font-weight: 200;
`
const FilterSize=styled.select`
    margin: 0px 5px;
    padding:5px;
    font-size:18px;
    cursor:pointer;
`

const FilterSizeOption = styled.option``;

const AddContainer=styled.div`
    display: flex;
    align-items: center;
    width:50%;
    justify-content:space-between;
`
const AmountContainer=styled.div`
    display: flex;
    align-items: center;
    font-weight:500;
`
const Amount=styled.span`
    width:30px;
    height:30px;
    border-radius: 10px;
    border: 1px solid orange;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button=styled.button`
    padding: 5px;
    border:1px solid orange;
    background-color: white;
    cursor: pointer;
    font-weight:400;

    &:hover {
        background-color:#f5f5f5;
    }
`

const Icon= styled.img`
    width:24px;
    cursor:pointer;
    &:hover {
        transform:scale(1.1);
    }
`;

const Single_Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
  
    useEffect(() => {
      const getProduct = async () => {
        try {
          const res = await publicRequest.get("/products/find/" + id);
          setProduct(res.data);
        } catch {}
      };
      getProduct();
    }, [id]);
  
    const handleQuantity = (type) => {
      if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    };
  
    const handleClick = () => {
      dispatch(
        addProduct({ ...product, quantity,size })
      );
    };
    return (
        <Container>
            <Navbar></Navbar>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>{product.desc}</Description>
                    <Price>{product.price}$</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Icon src={Remove} onClick={() => handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Icon src={Add} onClick={() => handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Footer></Footer>
        </Container>
    )
}

export default Single_Product
