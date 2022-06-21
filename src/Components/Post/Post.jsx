import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';


export default function Post({ picture, userName, link, text, title, description, image, likes, liked, userId, postId }) {

  console.log("postId:" + postId)
  const navigate = useNavigate();

  function findHashtags(text) {
    text = text.split(' ')
    let html = []
    for (let i = 0; i < text.length; i++) {
      if (text[i][0] === '#') {
        html.push(<Link to={`/hashtag/${text[i].replace('#', '')}`}> {text[i]}</Link>)
      } else {
        html.push(' ' + text[i])
      }
    }
    return (
      html
    )
  }

  if (image === "") {
    image = "https://archive.org/download/no-photo-available/no-photo-available.png"
  }

  return (
    <PostWrapper ionIconColor={liked ? '#AC0000' : 'white'} key={postId}>
      <div className='left'>
        <div className='profilePicture'>
          <img src={picture} alt="" />
        </div>
        <ion-icon name={liked ? 'heart' : 'heart-outline'} />
        <p>{likes} likes</p>
      </div>
      <div className='right'>
        <h2 onClick={() => { navigate(`/user/${userId}`)} }>{userName}</h2>
        <h3>{findHashtags(text)}</h3>
        <div className='postLink' onClick={() => { window.open(link, "_blank"); }}>
          <div className='postLinkText'>
            <h3>{title}</h3>
            <h4>{description}</h4>
            <h5>{link}</h5>
          </div>
          <div className='postLinkImage'>
            <img src={image} alt="ilustration" />
          </div>
        </div>
      </div>
    </PostWrapper>
  )
}

const PostWrapper = styled.div`
    width: 100%;
    background-color: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
   
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

  .right{
    width: 85%;
  }
  .right .postLink{
    height: 155px;
    width: 98%;
    left: 328px;
    top: 571px;
    border-radius: 11px;
    border: 1px solid #C4C4C4;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    overflow: hidden;
  }
   .right .postLink .postLinkText{
    width: 90%;
    padding-left: 20px;
    padding-top: 15px;
  }
   .right .postLink .postLinkImage{
    width: 153.44px;
    height: 155px;
  }
    .right .postLink .postLinkImage img{
    width: 100%;
    height: 100%;
    object-fit: cover;
   }
   .left{
    width: 15%;
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
  .left ion-icon{
    font-size: 20px;
    color: ${props => props.ionIconColor};
    margin-top: 19px;
    cursor: pointer;
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