import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import RenderPosts from './RenderPosts';
import HashtagContainer from '../HashtagBox'

export default function GetTimeline() {


    return (
        <>
            <Header />
            <$AuxBody className='auxBody'>
                <h1>
                    timeline
                </h1>
                <$Section className='section'>
                    <RenderPosts />

                </$Section>
                <$Navbar className='navBar'>
                    <HashtagContainer />
                </$Navbar>
            </$AuxBody>
        </>
    )
}



const $AuxBody = styled.div`
    margin-top: 200px;
    width: 100%;
    min-height: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px fit-content(10%) fit-content(10%);
    justify-content: center;
    gap: 25px;

    h1{
        grid-column-start: 2;
        grid-column-end: 5;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        color: white;
    }

    
    @media (max-width: 1080px) {
        .navBar{
        display: none;
    }
        .section{
            grid-column-start: 2;
            grid-column-end: 7;
        }

    }

    @media (max-width: 630px) {

        & {
        justify-content: space-evenly;
        justify-items: center;
        position: relative;
        }
        
        &>h1{
            grid-column-start: 1;
            grid-column-end:8;
            justify-self: start;
            margin-left: 5%;
            
        }
        .navBar{
            display: none;
        }
        .section{
            grid-column-start: 1;
            grid-column-end:8;
            width: 90%;
            
        }

    }
    
`


const $Section = styled.div`
    width: 100%;
    grid-column-start: 2;
    grid-column-end: 5;
    
`


const $Navbar = styled.div`
    width: 100%;
    max-width: 300px;
    grid-column-start: 5;
    grid-column-end: 7;
`