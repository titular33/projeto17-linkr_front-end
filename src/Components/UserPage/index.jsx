import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post.jsx'
import Header from '../Header'
import HashtagContainer from '../HashtagBox/index.jsx';

export default function UserPage() {

  const params = useParams()
  const URL = `http://127.0.0.1:4000/user/${params.id}`
  const token = JSON.parse(localStorage.getItem('userData')).token
  const [userData, setUserData] = useState()
  useEffect(getData, [])

  function getData() {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    axios.get(URL, config)
      .then(res => { setUserData(res.data); console.log(res.data) })
  }

  if (!userData) {
    return (
      <Loading>
        <div className='loading' />
      </Loading>
    )
  }

  if (userData) return (

    <$AuxBody>
        <Header />

        <$Title>
          <$Img picture={userData.picture}></$Img>
          <h1>{userData.userName}'s Posts</h1>
        </$Title>
      <Container>
        {userData.posts.map((post) => <Post
          picture={userData.picture}
          userName={userData.userName}
          link={post.link}
          text={post.text}
          title={post.title}
          description={post.description}
          image={post.image}
          likes={post.likes}
          liked={post.liked}
        />)}
      </Container>
      <$HashtagContainer>
        <HashtagContainer />
      </$HashtagContainer>
    </$AuxBody>
  );
}


const $AuxBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 15px;
`

const $HashtagContainer = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
`

const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .loading{
    animation: is-rotating 1s infinite;
    width: 50px;
    height: 50px;
    border: 6px solid gray;
    border-top-color: #fff;
    border-radius: 50%;
  }

@keyframes is-rotating { 
    to {
        transform: rotate(1turn);
    }
}
`
const $Title = styled.div`
  width: 100%;
  margin-top: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-column-start: 2;
  grid-column-end: 3;
  
  h1{
    color: white;
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    //text-align: left;
  }
`
const $Img = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${props => props.picture});
  background-size: cover;
  margin-right: 15px;

`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 241px;*/
  /* margin-top: 160px;  */
  grid-column-start: 2;
  grid-column-end: 3;


  h2{
    font-family: Lato;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
    margin-top: 20px;
  }
  h3{
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    font-family: Lato;
    color: #B7B7B7;
    margin-top: 8px;
  }
  h4{
    padding-top: 4px;
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: left;
    color: #9B9595;
  }
  h5{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
    margin-top: 13px;
  }
  .post{
    margin-bottom: 16px;
    width: 611px;
    /* height: 209px; */
    background-color: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
  }
  .post .right{
    padding-left: 15px;
  }
  .post .right .postLink{
    height: 155px;
    width: 503px;
    left: 328px;
    top: 571px;
    border-radius: 11px;
    border: 1px solid #C4C4C4;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    overflow: hidden;
  }
  .post .right .postLink .postLinkText{
    width: 350px;
    padding-left: 20px;
    padding-top: 15px;
  }
  .post .right .postLink .postLinkImage{
    width: 153.44px;
    height: 155px;
    background-color: red;
  }
   .post .right .postLink .postLinkImage img{
    width: 100%;
    height: 100%;
    object-fit: cover;
   }
  .post .left{
    width: 86px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Lato, sans-serif;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: center;
    color: white;
    padding-bottom: 20px;
  }
  .post .left ion-icon{
    font-size: 20px;
    color: white;
    margin-top: 19px;
  }
  .left .profilePicture{
    margin-top: 17px;
    height: 50px;
    width: 50px;
    border-radius: 304px;
  }
  .left .profilePicture img{
    width: 100%;
    height: 100%;
    border-radius: 304px;
    cursor: pointer;
    object-fit: cover;
  }
 `