import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import RenderPosts from './RenderPosts';

export default function GetTimeline() {


    return (
        <>
            <Header />
            <$AuxBody>
                <h1>
                    timeline
                </h1>
                <$Section>
                    <CreatePost />
                    <RenderPosts />

                </$Section>
                <Navbar />

            </$AuxBody>
        </>
    )
}

const CreatePost = styled.div``


const $AuxBody = styled.div`
    margin-top: 200px;
    width: 100%;
    min-height: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px fit-content(10%) fit-content(10%);
    justify-content: center;
    gap: 25px;

    h1{
        grid-column-start: 2;
        grid-column-end: 4;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        color: white;
    }
    
`


const $Section = styled.div`
    grid-column-start: 2;
    grid-column-end: 4;
    
`


const Navbar = styled.div`
    background-color: #171717;
    width: 300px;
    height: 400px;
    grid-column-start: 4;
    grid-column-end: 5;
`