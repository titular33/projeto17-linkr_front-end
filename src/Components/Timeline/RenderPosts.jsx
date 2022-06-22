import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Likes from '../Likes'
import NewPost from './NewPost';
/* import Comments from '../Coments'; */

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
    const URL = "https://abef-linkr-api.herokuapp.com/timeline"

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
  console.log(infos);
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



    return (
        <>
            <$EachPost >

                {canDeletePost ? <ModalDelete infos={infos} setCanDeletePost={setCanDeletePost} setPosts={setPosts} /> : ""}
                <$Box >

                    <$InfosLeft>
                        <$Img img={infos.picture} />
                        
                        <Likes  liked={liked} postId={infos.id} quantLikes={infos.likes} user = {infos.userName}/>
                    </$InfosLeft>

                    <$InfosRight>
                        {isUserPost ? <$CanEdit>
                            <ion-icon name="create-outline" onClick={(e) => {
                                if (canEditPost) {
                                    setCanEditPost(false)
                                } else {
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

                        {canEditPost ? <EditPost infos={infos} setCanEditPost={setCanEditPost} setPosts={setPosts} /> : <p> {infos.text} </p>}

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
                {/* <Comments
            setTotalComments={setTotalComments}
            commentState={commentState}
            postId={post.id}
            isRepost={post.userRepostName}
            whoPosted={post.userId}
        /> */}
            </$EachPost>

        </>
    )
}

function EditPost({ infos, setCanEditPost, setPosts }) {
    const [infosToEdit, setInfosToEdit] = useState({})
    let { token } = JSON.parse(localStorage.getItem('userData'))
    const textEdit = useRef(null)
    const URL_POST = "https://abef-linkr-api.herokuapp.com/post"



    useEffect(() => {
        setInfosToEdit({ link: infos.link, text: infos.text })
        textEdit.current.focus()
    }, [])

    function putPost() {
        const config = {
            headers: { id: infos.id, authorization: token }
        }
        const requet = axios.put(URL_POST, infosToEdit, config);
        requet.then(() => { setCanEditPost(false); getPosts(setPosts) });
        requet.catch(() => { alert("Não foi possível editar o post") })
    }

    return (
        <$InputEditPost onKeyUp={(e) => {
            if (e.key === "Escape" || e.key === "Esc") {
                setCanEditPost(false)
            }
            if (e.key === "Enter") {
                putPost()
            }
        }}>
            <textarea
                ref={textEdit}
                name="text"
                value={infosToEdit.text}
                onChange={(e) => { setInfosToEdit({ ...infosToEdit, text: e.target.value }) }}
            >
            </textarea>

        </$InputEditPost>
    )
}

function ModalDelete({ infos, setCanDeletePost, setPosts }) {

    let { token } = JSON.parse(localStorage.getItem('userData'))
    const [loading, setLoading] = useState(false)
    const URL_POST = "https://abef-linkr-api.herokuapp.com/post"


    function deletePost() {
        const config = {
            headers: { id: infos.id, authorization: token }
        }
        const requet = axios.delete(URL_POST, config);
        requet.then(() => { setCanDeletePost(false); getPosts(setPosts) });
        requet.catch(() => { alert("Não foi possível deletar o post") })
    }

    return (
        <$ModalDeletePost loading={loading} onClick={() =>{setCanDeletePost(false)}}>
            <div>
                <p>Are you sure you want <br /> to delete this post?</p>
                <button className='no'  disabled={loading} onClick={() => { setCanDeletePost(false) }}>No, go back</button>
                <button className='yes' disabled={loading} onClick={(e) => { setLoading(true); deletePost(); e.stopPropagation() }} >{loading ? <ThreeDots color="#fff" height={13}/> : "Yes, delete it"}</button>
            </div>
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

    @media (max-width: 640px) {
        border-radius: 0%;
    }
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
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    
    & > div{
        display: grid;
        grid-template-columns: 1fr 1fr; 
        background-color: #333333;
        border-radius: 50px;
        padding: 60px 130px;
        gap: 30px;
        justify-content: center;
        align-items: center;
        filter: ${props =>{ return props.loading ? 'brightness(60%)': 'brightness(100%)'}};
    }
    
    & > div p{
        grid-column-start: 1;
        grid-column-end: 3;

        font-family: 'Lato';
        font-weight: 700;
        font-size: 34px;
        color: #FFFFFF;
        text-align: center;
    }

    
    & > div .no{
        grid-column-start: 1;
        grid-column-end: 2;
        width: 140px;
        height: 40px;
        padding: 5px 15px;

        border: none;
        border-radius: 5px;

        background-color: white;
        color: #1877F2;

        font-family: 'Lato';
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
        
    }
    
    & > div .yes{
        grid-column-start: 2;
        grid-column-end: 3;
        padding: 5px 15px;

        width: 140px;
        height: 40px;

        border: none;
        border-radius: 5px;
        cursor: pointer;

        background-color: #1877F2;
        color: white;

        font-family: 'Lato';
        font-weight: 700;
        font-size: 18px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

`