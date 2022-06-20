import axios from 'axios';
import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import ReactTooltip from "react-tooltip"
import styled from 'styled-components';
import UserContext from "../../Contexts/UserContext.jsx"
import NewPost from './NewPost';
import { FiHeart } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"
export default function RenderPosts() {

    let errorMessage = "";

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        getPosts(setPosts)
    }, [])


    if (posts === null) {
        errorMessage = "Loading..."
    }

    else if (posts.length === 0) {
        errorMessage = " There are no posts yet."
    }

    else if (posts.e) {
        errorMessage = "An error occured while trying to fetch the posts, please refresh the page"
    }


    return (
        <>
            <NewPost setPosts={setPosts} />
            {
                posts === null || posts.length === 0 || posts.e ?
                    errorMessage :
                    <AllPosts posts={posts} setPosts={setPosts} />
            }
        </>

    )

}


async function getPosts(setPosts) {
    const URL = "http://127.0.0.1:4000/timeline"

    let { token } = JSON.parse(localStorage.getItem('userData'))

    const config = {
        headers: { authorization: token }
    }

    const requestPosts = axios.get(URL, config)
    requestPosts.then(res => { setPosts(res.data) })
    requestPosts.catch(e => { setPosts({ e }) })

}

function AllPosts(props) {
    const { posts, setPosts } = props;

    return (
        posts.map(infos => {
            return (

                <EachPost key={infos.id + infos.createdAt} infos={infos} setPosts={setPosts} />

            )
        })
    )
}

function EachPost(props) {
    let navigate = useNavigate()


    const { infos, setPosts } = props;

    if (infos.image === "") {
        infos.image = "https://archive.org/download/no-photo-available/no-photo-available.png"
    } // isso aqui pode vir do back já

    let liked = infos.liked
    let { userId, token } = JSON.parse(localStorage.getItem('userData'))
    let isUserPost = false;

    const [canDeletePost, setCanDeletePost] = useState(false)
    const [canEditPost, setCanEditPost] = useState(false)

    if (userId === infos.userId) {
        isUserPost = true;
    }


    const { user } = useContext(UserContext)
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


    

    return (
        <>
            <$EachPost >

                {canDeletePost ? <ModalDelete infos={infos} setCanDeletePost={setCanDeletePost} setPosts={setPosts} /> : ""}
                <$Box >

                    <$InfosLeft>
                        <$Img img={infos.picture} />
                        {liked ? <ion-icon name="heart" onClick ={ () => handleLike()} ></ion-icon>
                         : <ion-icon name="heart-outline" onClick={handleLike}></ion-icon>}
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
                         {likedBy && <span>{likeTooltip}</span>}
                        </ReactTooltip>
                    </$InfosLeft>

                    <$InfosRight>
                        {isUserPost ? <$CanEdit>
                            <ion-icon name="create-outline" onClick={(e) => {
                                if(canEditPost){
                                    setCanEditPost(false)
                                }else{
                                    setCanEditPost(true);
                                    //textEdit.current.focus()
                                }                               
                            }}>

                            </ion-icon>
                            <ion-icon name="trash-outline" onClick={(e) => {
                                setCanDeletePost(true)
                            }}>

                            </ion-icon>
                        </$CanEdit> : <></>}

                        <h6 onClick={() => { navigate(`/user/${infos.userId}`) }}>
                            {infos.userName}
                        </h6>

                        {canEditPost ? <EditPost infos={infos} setCanEditPost={setCanEditPost} setPosts={setPosts}/> : <p> {infos.text} </p>}

                        <$Embed onClick={() => { window.open(infos.link, "_blank"); }}>
                            <$EmbedTitle>
                                {infos.title}
                            </$EmbedTitle>
                            <$EmbedDescription>
                                {infos.description}
                            </$EmbedDescription>
                            <$EmbedLink>
                                {infos.link}
                            </$EmbedLink>
                            <$EmbedImg img={infos.image}>
                            </$EmbedImg>

                        </$Embed>
                    </$InfosRight>
                </$Box>
            </$EachPost>

        </>
    )
}

function EditPost({ infos, setCanEditPost, setPosts }) {
    const [infosToEdit, setInfosToEdit] = useState({})
    let { token } = JSON.parse(localStorage.getItem('userData'))
    const textEdit = useRef(null)



    useEffect(() =>{
        setInfosToEdit({ link: infos.link, text: infos.text })
        textEdit.current.focus()
    }, [])

    function putPost() {
        const config = {
            headers: { id: infos.id, authorization: token }
        }
        const requet = axios.put("http://127.0.0.1:4000/post", infosToEdit, config);
        requet.then(() => { setCanEditPost(false); getPosts(setPosts) });
        requet.catch(() => { alert("Não foi possível editar o post") })
    }

    return (
        <$InputEditPost onKeyUp={(e) =>{
            if(e.key === "Escape" || e.key === "Esc"){
                setCanEditPost(false)
            }
            if(e.key === "Enter"){
                putPost()
            }
            }}>
            <textarea 
            ref={textEdit}
            name="text" 
            value={infosToEdit.text} 
            onChange={(e) => {setInfosToEdit({...infosToEdit, text: e.target.value})}}
            >
            </textarea>
          
        </$InputEditPost>
    )
}

function ModalDelete({ infos, setCanDeletePost, setPosts }) {

    let { token } = JSON.parse(localStorage.getItem('userData'))



    function deletePost() {
        const config = {
            headers: { id: infos.id, authorization: token }
        }
        const requet = axios.delete("http://127.0.0.1:4000/post", config);
        requet.then(() => { setCanDeletePost(false); getPosts(setPosts) });
        requet.catch(() => { alert("Não foi possível deletar o post") })
    }

    return (
        <$ModalDeletePost>
            <p>Deseja deletar este post?</p>
            <button onClick={() => { deletePost() }} >sim</button>
            <button onClick={() => { setCanDeletePost(false) }}>não</button>
        </$ModalDeletePost>
    )
}

const $InputEditPost = styled.div`
    width: 100%;
    
    textarea{
        height: 80px;
        width: 100%;
        border: none;
        border-radius: 7px;
        margin: 8px 0px;
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */
        padding: 5px;
        resize: vertical;
        font-family: 'Lato';
        font-weight: 300;
        font-size: 15px;
    }
`

const $CanEdit = styled.div`
    position: absolute;
    top: 5px;
    right: 15px;

    ion-icon[name="create-outline"]{
        color: white;
        font-size: 20px;
        padding: 5px;

    }
    ion-icon[name="trash-outline"]{
        color: white;
        font-size: 20px;
        padding: 5px;

    }
`


const $EachPost = styled.div`
    width: 100%;
    padding: 15px;
    margin-bottom: 30px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background-color: #171717;
`

const $Box = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
`

const $InfosLeft = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: flex-start;

    p{
        color: white;
        font-family: 'Lato';
        font-size: 11px;
    }

    ion-icon[name="heart-outline"]{
        color: white;
    }
    ion-icon[name="heart"]{
        color: red;
    }
    `


const $InfosRight = styled.div`
    width: 85%;
    position: relative;

    & > h6{
        max-width: 80%;
        color: white;
        font-family: 'Lato';
        font-size: 19px;
        padding: 7px 0px;
        cursor: pointer;
        &:hover{
            filter: brightness(90%);
        }
    }

    & > p{
        color: white;
        font-family: 'Lato';
        font-size: 17px;
        padding: 7px 0px;
    }

    

`

const $Embed = styled.div`
    width: 100%;
    min-height: 150px;
    border: 1px solid #4D4D4D;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;

    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 2fr 2fr 1fr;
    align-items: center;

    position: relative;
    overflow: hidden;

    &:hover{
        filter: brightness(90%);
    }

`

const $EmbedTitle = styled.h6`
    grid-column-start: 1;
    text-overflow: ellipsis;
    margin: 10px 20px;
    font-family: 'Lato';
    font-size: 16px;
    color: #CECECE;
`

const $EmbedDescription = styled.p`
    margin: 10px 20px;
    grid-column-start: 1;
    font-family: 'Lato';
    font-size: 11px;
    color: #9B9595;
`

const $EmbedLink = styled.p`
    margin: 10px 20px;
    grid-column-start: 1;
    font-family: 'Lato';
    font-size: 11px;
    color: #CECECE;
`

const $EmbedImg = styled.div`
    grid-column-start: 2;
    grid-row-start:1;
    grid-row-end: 4;
    width: 100%;
    min-height: 150px;
    background-color: grey;

    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;

    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center; 
`





const $Img = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;

`

const $ModalDeletePost = styled.div`
    height: 50px;
    width: 100%;
    background-color: red;
`

 const LikesContainer = styled.div`
  text-align: center;
  font-size: 12px;
  cursor: default;
  user-select: none;
  div {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.tooltipText};
    font-weight: 700;
  }
  
  
`
export const LikeIcon = styled(FiHeart)`
  font-size: 25px;
  cursor: pointer;
  
`
export const LikeIconFilled = styled(FaHeart)`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.likeButton};
  cursor: pointer;
  
`