import { useEffect, useState } from "react";
import React from 'react'
import Product from './Product'
import styled from 'styled-components'
import axios from "axios";

const Container=styled.div`
    padding:20px;
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
`;


const Products_List = ({filters}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/products");
          setProducts(res.data);
        } catch (err) {}
      };
      getProducts();
    });

    useEffect(() => {
        setFilteredProducts(
          products.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        );
    }, [products,filters]);

    return (
        <Container>
            {
              filters
                ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
                : products
                .slice(0, 8)
                .map((item) => <Product item={item} key={item.id} />)}
        </Container>
    )
}

export default Products_List
