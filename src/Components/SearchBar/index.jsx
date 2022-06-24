import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function SearchBar() {

  const { token } = JSON.parse(localStorage.getItem('userData'))
  const config = {
    headers: { authorization: token }
  }

const [response, setResponse] = useState([])

const handleChange = (event) => {
  const {value} = event.target;
  if (value.length < 3){
    setResponse([])
  }
  else{
    const payload = {"username": value};
    axios.post("https://abef-linkr-api.herokuapp.com/usernames", payload, config)
    .then(res => 
      setResponse(res.data)
    )
  }
}

return (
        <Container>
          <input type="text" id="placeholder-text" placeholder={'Search for people'} onChange={handleChange}/>
          <ion-icon name="search-outline"/>
          {response.map(userInfo => 
          <Link to ={`/user/${userInfo.id}`}>
          <div className='user'>
            <div className='profilePicture'>
              <img src={userInfo.picture}  alt='profilePicture'/>
            </div>
            <h1>{userInfo.userName}</h1>
          </div>
          </Link>
          )}
        </Container>
    );  
}
    
const Container = styled.div`
  width: 100%;
  max-width: 640px;
  position: relative;
  background-color: #E7E7E7;
  border-radius: 8px;
  .user{
    width: 100%;
    height: 47px;
    display: flex;
    align-items: center;
    z-index: -1;
    background-color: #E7E7E7;
  }
  .user .profilePicture{
    margin-left: 10px;
    height: 39px;
    width: 39px;
    border-radius: 304px;
  }
  .user .profilePicture img{
    width: 100%;
    height: 100%;
    border-radius: 304px;
    cursor: pointer;
    object-fit: cover;
  }

  h1 { 
    margin-left: 12px;
    color: #515151;
    cursor: pointer;
  }
  
  input {
    width: 100%;
    height: 45px;
    padding: 14px;
    border-radius: 8px;
    color: black;
    border: none;
  };
  #placeholder-text::placeholder {
    color: #C6C6C6;
  };
  ion-icon{
    position: absolute;
    right: 0px;
    color: #C6C6C6;
    margin-top: 13px;
    margin-right: 17px;
    cursor: pointer;
    font-size: 21px;
  };
  textarea:focus, input:focus{
  outline: none;
  };
 `