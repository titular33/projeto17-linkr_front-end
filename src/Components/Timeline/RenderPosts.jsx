import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import NewPost from './NewPost';

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

    const [canDetePost, setCanDeletePost] = useState(false)

    if (userId === infos.userId) {
        isUserPost = true;
    }

    

    return (

        <$EachPost>

        {canDetePost ? <ModalDelete infos={infos} setCanDeletePost={setCanDeletePost} setPosts={setPosts}/> : ""}
            <$Box >

                <$InfosLeft>
                    <$Img img={infos.picture} />
                    {liked ? <ion-icon name="heart"></ion-icon> : <ion-icon name="heart-outline"></ion-icon>}
                    <p>
                        {infos.likes} likes
                    </p>
                </$InfosLeft>

                <$InfosRight>
                    {isUserPost ? <$CanEdit>
                        <ion-icon name="create-outline" onClick={(e) => {
                            console.log("Editar");
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
                    <p>
                        {infos.text}
                    </p>
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
    )
}

function ModalDelete({infos, setCanDeletePost, setPosts}){

    let { token } = JSON.parse(localStorage.getItem('userData'))



    function deletePost(){
        const config = {
            headers: { id: infos.id,  authorization: token}
        }
        const requet = axios.delete("http://127.0.0.1:4000/post", config);
        requet.then(() =>{ setCanDeletePost(false); getPosts(setPosts)});
        requet.catch(() =>{alert("Não foi possível deletar o post")})
    }

    return(
        <$ModalDeletePost>
            <p>Deseja deletar este post?</p>
            <button onClick={() =>{deletePost()}} >sim</button>
            <button onClick={() =>{setCanDeletePost(false)}}>não</button>
        </$ModalDeletePost>
    )
}

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