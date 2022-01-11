import React from 'react'
import styled from 'styled-components'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Products_List from '../Components/Products_List'
import { useState } from "react";

const Container=styled.div`

`;

const FilterContainer=styled.div`
    display:flex;
    justify-content:space-between;
`;

const Filter=styled.div`
    margin:20px;
`;

const FilterText=styled.span`
    font-size:20px;
    font-weight: 400;
    margin-right:20px;
`;

const Select=styled.select`
    padding: 2px;
    margin-right: 20px;
    border:none;
`;

const Option=styled.option`
    padding: 10px;
    margin-right: 20px;
    font-size:18px;
`;

const Menu = () => {
    const [filters, setFilters] = useState({categories:"American",size:"Medium"});

    const handleFilters = (e) => {
        const value = e.target.value;
            setFilters({
                ...filters,
                [e.target.name]: value,
            });
    };
    return (
        <Container>
            <Navbar></Navbar>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="categories" onChange={handleFilters} onLoad={handleFilters}>
                        <Option disabled>Type</Option>
                        <Option>American</Option>
                        <Option>Italian</Option>
                        <Option>Romanian</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters} onLoad={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option>Small</Option>
                        <Option selected>Medium</Option>
                        <Option>Large</Option>
                        <Option>Family</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products_List filters={filters}/>
            <Footer></Footer>
        </Container>
    )
}

export default Menu
