//eslint-disableprettier eslint-disable-line 
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function PostComments ({postId})
{
    const [comments, setComments] = useState("");
    const [text, setText] = useState("");
    const { token, picture } = JSON.parse(localStorage.getItem('userData'));
    function createComment(e){
        e.preventDefault();
        const body = {comment:text, postId};
        const config = {
            headers: { authorization: token }
        }
        let request = axios.post("http://127.0.0.1:4000/comments",body, config);
        request.then(res => {
            setComments("");
        });

        request.catch(err => {console.log(err)});


    }   
    return (
        <WriteComment onSubmit={createComment}>
        <img src= {picture} alt="foto" />
        <input type="text" placeholder="Add a comment" minLength = "1" value={text} onChange={(e) => setText(e.target.value)}required/>
            <ButtonSendComment type="submit">
                <IconSendComment/>
             </ButtonSendComment>
       </WriteComment>
    )
} 

const WriteComment = styled.form`
    height: 83px;
    width: 95%;
    padding-left: 33px;
    position: relative;
    display: flex;
    align-items: center;
    input {
        width: 600px;
        padding: 0 40px 0 11px;
        height: 39px;
        background-color: #252525;
        border-radius: 8px;
        color: #ACACAC;
    }
    input::placeholder {
        color: #575757;
        padding-left: 10px;
    }
    input:focus {
        outline: 0;
    }
    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 18px;
        object-fit: cover;
    }
    @media (max-width: 635px) {
        width: 95%;
    }
`;

const ButtonSendComment = styled.button`
    background-color: Transparent;
    position: absolute;
    top: 32px;
    right: 5px;
`;
const IconSendComment = styled(IoPaperPlaneOutline)`
    color: #F3F3F3;
    width: 18px;
    height: 18px;
    &:hover {
    cursor: pointer;
    color: #1877f2;
  }   
`;