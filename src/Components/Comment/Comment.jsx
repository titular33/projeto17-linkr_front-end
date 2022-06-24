import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import CommentInput from "./CommentInput"



const URL = 'http://localhost:4000/comments'

function getComments(setComments, infosUser){
  console.log(infosUser)
  const { token } = JSON.parse(localStorage.getItem('userData'))
  const config = {
  headers: { postId: infosUser.id, authorization: token }
  }
  const requestComments = axios.get(URL, config)
    requestComments.then(res => setComments([...res.data]))
    requestComments.catch(e => { setComments({ e }) })
}

export default function Comment({infosUser}) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(setComments, infosUser)
  },[])
  const navigate = useNavigate

  return (
    <>
    {comments.map((comment, index) =>
     <Container key={index}>
      <Content>
        <div className='left'>
          <div className='profilePic'>
            <img src={comment.picture} 
            alt='profilePicOfUser'
            onClick={() => navigate(`/user/${comment.idAuthor}`)}
            />
          </div>
        </div>

        <div className='right'>
          <div className='userName' onClick={() => navigate(`/user/${comment.idAuthor}`)}>
            <h1>
              {comment.nameAuthor}
            </h1>
            {comment.idAuthor === infosUser.userId? <h2>• post's author </h2>:comment.iFollow? <h2>• following</h2>:<></>}
          </div>
          <div className='textContent'>
            <h3>{comment.comment}
            </h3>
          </div>
        </div>
      </Content>
    </Container>)}
    <CommentInput postId={infosUser.id}
     getComments={getComments(setComments, infosUser)}/>
    </>
  )
}

const Container = styled.div`
  
  min-height: 75px;
  width: 100%;
  background-color: #1E1E1E;
  margin-bottom: 1px;

  a:link {
  text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }
`
const Content = styled.div`
  display: flex;
  .profilePic{
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-top: 15px;
    margin-left: 25px;
  }
  .right{
    margin-left: 18px;
  }
  .userName{
    display: flex;
    margin-top: 12px;  
  }
  .profilePic img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
  h1{
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
  }
  h2{
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #565656;
    margin-top: 3.3px;
    margin-left: 4px;
  }
  h3{
    color: #ACACAC;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding-bottom: 18px;
    text-align:justify;
    padding-right: 18px;
  }
`