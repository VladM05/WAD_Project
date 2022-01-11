import React from 'react'
import styled from 'styled-components'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

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
    width:25%;
    padding:20px 25px;
    background-color:white;
    border-radius:5px;
`

const Form=styled.form`
    display: flex;
    flex-direction:column;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 15px 10px 0px 0px;
    padding: 10px;
    border: 1px solid #d18162;
`

const Button=styled.button`
    width:40%;
    border: none;
    margin: 15px 0px;
    padding: 10px 20px;
    cursor: pointer;
    background-color:#e48e66;
    font-weight:550;
    color: white;
`
const Link=styled.a`
    margin: 5px 0px;
    font-size:16px;
    cursor: pointer;
    color: #d18162;
`

const Error = styled.span`
  color: red;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    return (
        <Container>
            <Wrapper>
                <Form>
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleClick} disabled={isFetching}>Login</Button>
                    {error ? <Error>Something went wrong...</Error> : null}
                    <Link href='/register'>Don't Have An Account?</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
