import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from "../../Contexts/UserContext"
import { useContext } from 'react';

import Banner from '../Banner'

const SignIn = () => {
    const navigate = useNavigate();
    const [loginData, setloginData] = useState({ email: "", password: "" });
    const [load, setLoad] = useState(false);
    const [alert, setAlert] = useState(null);
    
    const { setUserData } = useContext(UserContext);

    function userLogin(event) {
        setAlert(null);
        event.preventDefault();
        setLoad(true); 
        const requisicaoPost = axios.post("https://abef-linkr-api.herokuapp.com/signin", loginData);               
        requisicaoPost.then(response => {
            const { data } = response;
            localStorage.setItem("userData", JSON.stringify({ userId: data.id, token: data.token, userName: data.userName, picture: data.picture }))
            setUserData({ token: data.token, userId: data.id, userName: data.userName, picture: data.picture });
            setLoad(false);
            navigate('/timeline')
        }); requisicaoPost.catch(error => {
            if (error.response.status === 401) {
                setAlert('Email ou senha incorreto(s)');
            }
            setLoad(false);
        });
    }

    return (
        <Container>
            <Banner></Banner>
            <RegisterContainer load={load} onSubmit={userLogin}>
                <input type="email" name="email" placeholder='email'
                    onChange={e => setloginData({ ...loginData, email: e.target.value })}
                    disabled={load ? true : false} required />
                <input type="password" minLength="4" name="password" placeholder='password'
                    onChange={e => setloginData({ ...loginData, password: e.target.value })}
                    disabled={load ? true : false} required />
                <Label>{alert}</Label>
                <Button load={load} disabled={load ? true : false} type="submit">{load ? <ThreeDots color="#fff" height={13} /> : "Log In"}</Button>
                <Div>
                    <Link to={`/signup`}>
                        <span>First time? Create an account!</span>
                    </Link>
                </Div>
            </ RegisterContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100vw;

    @media (max-width: 823px) {	  
        flex-direction:  column;
        align-items: center;
    }
`
const RegisterContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 429px;
    margin-left: 51px;
    margin-right: 51px;

    input{
        padding-left: 17px;
        width: 100%;
        height: 65px;
        margin-top: 13px;
        background: #FFFFFF;
        border-radius: 6px;
        opacity:${props => props.load ? 0.2 : 1};
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #9F9F9F;
    }
    @media (max-width: 500px) {	  
        width: 88%;
        margin-left: 0;
        margin-right: 0;

        input{
            height: 55px;
            margin-top: 11px;
            font-size: 22px;
            line-height: 33px;
        }
    }
`
const Button = styled.button`
        opacity:${props => props.load ? 0.2 : 1};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 65px;
        align-items: center;
        justify-content: center;
        background: #1877F2;
        border-radius: 6px;
        border: none;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
        cursor: pointer;
        margin-top: 14px;

        @media (max-width: 500px) {	  
            height: 55px;
        }
`
const Div = styled.div`
        width: 100%;
        margin-top: 14px;
        display: flex;
        justify-content: center;
    
    span{
        color: #FFFFFF;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
        cursor: pointer;
    }

    @media (max-width: 390px) {	  
        span{
            font-size: 17px;
            line-height: 20px;
        }
    }
`
const Label = styled.label`
    font-size: 12px;
    color: red;  
    padding-top: 5px;
`
export default SignIn;
