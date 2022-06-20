import styled from 'styled-components';
import {Link} from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from 'axios';




export default function HashtagContainer() {

const [trending, setTrending] = useState()
const URL = `http://127.0.0.1:4000/hashtags`
useEffect(getData, []) 


function getData(){
  axios.get(URL)
  .then(res => { 
    let hashtags = []
    for(let i = 0; i < res.data.length; i++){
      hashtags.push(res.data[i].hashtag)
    } 
    setTrending(hashtags)
  })
}

if (!trending){
  return (
  <Container>
    <Loading>
    <div className='loading'/>
    </Loading>
  </Container>
  )
}


return (
        <Container>
            <div>
              <h1>
                trending
              </h1>
            </div>
            <div className='line'/>
            <div> 
              {trending.map(themes => 
                <h2 >
                  <Link to={`/hashtag/${themes.replace('#','')}`}>
                    { themes}
                  </Link>
                </h2>)}
            </div>
        </Container>
    );  
}
    
const Container = styled.div`
  background-color: #171717;
  border-radius: 16px;
  width: 100%;
  min-height: 406px;
  
  a:link {
  text-decoration: none;
  color: white;
  }
  a:visited {
    text-decoration: none;
    color: white;
  }
  a:hover {
    text-decoration: none;
    color: white;
  }
  a:active {
    text-decoration: none;
    color: white;
  }
  h1 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    color: white;
    padding-top: 9px;
    margin-left: 16px;
  };
  .line {
    margin-top: 12px;
    margin-bottom: 22px;
    width: 100%;
    border: 1px solid #484848;
  }
  h2{
    margin-left: 16px;
    font-family: Lato;
    font-size: 19px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0.05em;
    text-align: left;
    color: white;
    margin-bottom: 7px;
  }
 `
 const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 150px;
  
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
}`