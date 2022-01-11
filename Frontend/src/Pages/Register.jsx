import React from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import { useRef } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { register } from "../redux/apiCalls";

const Container=styled.div`
    width:100vw;
    height:100vh;
    background: url('https://i.imgur.com/LvuxevW.jpg') center;
    background-size:cover;
    display: flex;
    align-items: center;
    justify-content:center;
`
const Wrapper=styled.div`
    width:40%;
    padding:20px;
    background-color:white;
    border-radius:5px;
`
const Title=styled.h1`
    font-size:24px;
    font-weight:600;
    color: #e48e66;
`
const Form=styled.form`
    display: flex;
    flex-wrap:wrap;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 20px 10px 0px 0px;
    padding: 5px;
    border: 1px solid #d18162;
`
const Agreement=styled.span`
    font-size:12px;
    margin:15px 0px;
    color:#e48e66;
`
const Button=styled.button`
    width:40%;
    border: none;
    margin: 5px;
    cursor: pointer;
    background-color:#e48e66;
    font-weight:550;
    color: white;
`

const Error = styled.span`
  color: red;
`;

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    let pass_error=false

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain !== password) {
            pass_error=true;
        } else {
            pass_error=false;
            register(dispatch, { username, email, password });
            history.push("/login");
        }
    };
    return (
        <Container>
            <Wrapper>
                <Title>Create Account</Title>
                <Form onSubmit={handleClick}>
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} maxLength="16"/>
                    <Input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} type="email" maxLength="36"/>
                    <Input placeholder="Password" type="password" required onChange={(e) => setPassword(e.target.value)} maxLength="20"/>
                    <Input placeholder="Confirm Password" type="password" required onChange={(e) => setPasswordAgain(e.target.value)} maxLength="20"/>
                    <Agreement>By clicking the Create button,you accept our Terms and Conditions</Agreement>
                    {pass_error && <Error>Something went wrong...</Error>}
                    <Button type="submit">Create</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
