import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post.jsx'
import Header from '../Header'
import HashtagContainer from '../HashtagBox/index.jsx';

export default function HashtagPage() {

  const params = useParams()
  const URL = `https://abef-linkr-api.herokuapp.com/hashtags/${params.hashtag}`
  const token = JSON.parse(localStorage.getItem('userData')).token
  const [hashtagData, setHashtagData] = useState()
  useEffect(getData, [URL, token])

  function getData() {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    axios.get(URL, config)
      .then(res => { setHashtagData(res.data) })
  }

  // console.log(hashtagData, params)
  if (!hashtagData) {
    return (
      <Loading>
        <div className='loading' />
      </Loading>
    )
  }

  if (hashtagData) return (
    <OuterWrapper>
      <Header />
      <Wrapper className='wrapper'>
      <h6>#{params.hashtag}</h6>
        <Container className='container'>

          {hashtagData.map((post) => <Post
            picture={post.picture}
            userName={post.userName}
            link={post.link}
            text={post.text}
            title={post.title}
            description={post.description}
            image={post.image}
            likes={post.likes}
            liked={post.liked}
            userId={post.userId}
          />)}

        </Container>
        <$sidebar className='sidebar'>
          <HashtagContainer />
        </$sidebar>
      </Wrapper>
    </OuterWrapper>
  );
}


const $sidebar = styled.div`
    width: 100%;
    max-width: 300px;
    grid-column-start: 5;
    grid-column-end: 7;
`

const OuterWrapper = styled.div`
margin-top: 160px;

@media (max-width: 1080px) {
        .sidebar{
        display: none;
    }
        .container{
            grid-column-start: 2;
            grid-column-end: 7;
        }

    }

    @media (max-width: 630px) {

      .wrapper {
      justify-content: space-evenly;
      justify-items: center;
      position: relative;
      }

      .wrapper > h6{
          grid-column-start: 1;
          grid-column-end:8;
          justify-self: start;
          margin-left: 5%;
          
      }
      .sidebar{
          display: none;
      }
      .container{
          grid-column-start: 1;
          grid-column-end:8;
          width: 90%;
          
      }
    }

`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px fit-content(10%) fit-content(10%);
    justify-content: center;
    gap: 25px;
    
    & > h6{
    grid-column-start: 2;
    grid-column-end: 5;

    color: white;
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
  }
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  grid-column-start: 2;
  grid-column-end: 5;
  
  h1{
    color: white;
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 40px;
  }

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
  /* .post{
    margin-bottom: 16px;
    width: 611px;
    height: 209px;
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
  } */
 `