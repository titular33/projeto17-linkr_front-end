import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import styled from 'styled-components';
import TooltipText from '../TooltipText';

export default function Likes({liked, postId, quantLikes}) {

    const { token } = JSON.parse(localStorage.getItem('userData'));
    const [ isLiked, setIsLiked ] = useState(liked);
    const [ quantityLikesPost, setQuantityLikesPost ] = useState(quantLikes);
    const config = {
        headers: { authorization: token }
    }
    
    function likePost() {
        let request = axios.post("https://abef-linkr-api.herokuapp.com/like",{postId:postId}, config);
        request.then(res => {
        setIsLiked(!isLiked);
        setQuantityLikesPost((parseInt(quantityLikesPost) + 1));
        });
        request.catch(err => {console.log(err)});
    }
    function dislikePost() {
        let request = axios.delete(`https://abef-linkr-api.herokuapp.com/like/${postId}`, config);
        request.then(res => {
        setIsLiked(!isLiked);
        setQuantityLikesPost((parseInt(quantityLikesPost) - 1 ));
        });
        request.catch(err => {console.log(err)});
    }
    return(
        <>
            <LikeStyled isLiked={isLiked}>
                {isLiked 
                ? <ion-icon name = "heart" onClick={() => dislikePost()} />
                : <ion-icon name = "heart-outline" onClick={() => likePost()} />
                }
            </LikeStyled>
            {isLiked
                ?   <span style={{color: "white"}}
                        data-tip={TooltipText(isLiked, quantityLikesPost)} 
                        data-class={'tooltip'} 
                        data-place={'bottom'} 
                        data-arrow-color={'rgba(255, 255, 255, 0.9)'}>
                            {quantityLikesPost} likes
                    </span>
                :   <span style={{color: "white"}}
                        data-tip={TooltipText( isLiked, quantityLikesPost)} 
                        data-class={'tooltip'} 
                        data-place={'bottom'} 
                        data-arrow-color={'rgba(255, 255, 255, 0.9)'}>
                            {quantityLikesPost} likes
                    </span>
            }   
            <ReactTooltip type="light"/>
        </>
    )
    
};

const LikeStyled = styled.div`
    svg {
        font-size: 25px;
        margin-top: 10px;
        color: ${props => props.isLiked ? "red" : "#fff"};
    }
`;







































/* const { user } = useContext(UserContext)
const [likedBy, setLikedBy] = useState(() => {
    getLikedBy()
  })

  const [likeTooltip, setLikeTooltip] = useState()
  const [likedByUser, setlikedByUser] = useState(() => {
    getLikedByUser()
  })


  useEffect(() => {
    ReactTooltip.rebuild()

    let usersPart = likedBy && likedBy.join(", ")
    let numberPart = likedBy && liked - likedBy.length

    let tooltipNewText

    if (likedBy) {
      switch (liked) {
        case 0:
          tooltipNewText = "No one has liked it yet"
          break
        case 1:
          tooltipNewText = `Liked by ${likedBy[0]}`
          break
        case 2:
          tooltipNewText = `Liked by ${likedBy[0]} and ${likedBy[1]}`
          break
        case 3:
          if (likedByUser)
            tooltipNewText = `Liked by ${likedBy[0]}, ${likedBy[1]} and ${likedBy[2]}`
          if (!likedByUser)
            tooltipNewText = `Liked by ${usersPart} and ${numberPart} other`
          break
        case 4:
          if (likedByUser)
            tooltipNewText = `Liked by ${usersPart} and ${numberPart} other`
          if (!likedByUser)
            tooltipNewText = `Liked by ${usersPart} and ${numberPart} others`
          break
        default:
          tooltipNewText = `Liked by ${usersPart} and ${numberPart} others`
          break
      }
    }

    setLikeTooltip(tooltipNewText)
  }, [likedBy, infos.likes, likedByUser])

  function getLikedByUser() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    axios
      .get(`${process.URL}/likes/${userId}`, config)
      .then((response) => {
        setlikedByUser(response.data)
      })
  }

  function handleLike() {
    const API_URL = process.URL
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    if (!likedByUser) {
      props.post.likesCount += 1
      setlikedByUser(true)
      likedBy && setLikedBy(["you", ...likedBy])

      axios
        .post(`${API_URL}/likes/${userId}`, null, config)
        .then((response) => {})
        .catch((error) => {
          props.post.likesCount -= 1
          setlikedByUser(false)
          if (likedBy) {
            likedBy.shift()
            setLikedBy([...likedBy])
          }
        })
    } else {
      props.post.likesCount -= 1
      setlikedByUser(false)
      if (likedBy) {
        likedBy.shift()
        setLikedBy([...likedBy])
      }

      axios
        .delete(`/likes/${userId}`, config)
        .then((response) => {})
        .catch((error) => {
          props.post.likesCount += 1
          setlikedByUser(true)
          likedBy && setLikedBy(["you", ...likedBy])
        })
    }
  }

  function getLikedBy() {
    const LIMIT = 2

    axios
      .get(`${process.env.URL}/likes?postId=${userId}&limit=${LIMIT}`)
      .then((response) => {
        setLikedBy(response.data.likedBy)
      })
  }




{infos.like === 1 ? (
    <>{infos.like} likes</>
    ) : (
    <>{infos.like} likes</>
    )}
    <ReactTooltip
    id={String(props.post.id)}
    type="light"
    place="bottom"
    getContent={() => {
    return null
     }}
        >
     {likedBy && <span>{likeTooltip}</span>} */