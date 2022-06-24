import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { getComments } from './Comment'



export default function CommentInput({postId, setComments, infosUser}) {
  const { picture, token} = JSON.parse(localStorage.getItem('userData'))
  const [message, setMessage] = useState('')

  function sendMessage(){
    const URL = 'https://abef-linkr-api.herokuapp.com/comments'
    const config = {headers: {authorization: token }}
    let comment = message
    const payload = {postId , comment}
    axios.post(URL, payload, config)
    .then(res => getComments(setComments, infosUser))
    .catch(error => console.log(error))
  }

  return (
    <Container>
      <div className='profilePic'>
        <img src={picture} alt = 'my profile pic'/>
      </div>
      <input 
        type={'text'} 
        placeholder={'write a comment...'}
        onChange={e => setMessage(e.target.value)}
      />
      <ion-icon name="paper-plane-outline" onClick={() => sendMessage()}/>
    </Container>
  )
}

const Container = styled.div`
  min-height: 83px;
  width: 96%;
  border-bottom-left-radius: 16px;  
  border-bottom-right-radius: 16px;  
  background-color: #1E1E1E;
  margin-bottom: 1px;
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 2%;
  
  .profilePic{
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-top: 15px;
    margin-left: 25px;
  }
  .profilePic img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
  input {
    height: 39px;
    width: 100%;
    margin-right: 15px;
    border-radius: 8px;
    background-color: #252525;
    border: none;
    resize: none;
    outline: none;
    margin-top: 15px;
    margin-left: 14px;
    color: #ACACAC;
    padding: 15px;
    ::placeholder{
    font-style: italic;
    }
  }
  
  ion-icon{
    color: #F3F3F3;
    font-size: 15px;
    position: absolute;
    right: 36px;
    top: 26px;
    bottom: 3.13%;
    cursor: pointer;
  }
`