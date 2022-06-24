import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Likes from '../Likes'
import NewPost from './NewPost';
import { EditPost } from './EditPost';
import ModalDelete from './ModalDelete';
import { Link } from 'react-router-dom';
import RefreshNewPosts from './RefreshNewPosts';
import { ThreeDots } from 'react-loader-spinner';
import Comment from '../Comment/Comment';

export default function RenderPosts({ rotaName, URL, setuserInfos, clickToggleFollowing }) {

    let errorMessage = "";
    const [posts, setPosts] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    
    useEffect(() => {

        if (rotaName === "timeline") {
            getPosts(setPosts, URL)
        }

        if (rotaName === "hashtags") {
            getPosts(setPosts, URL)
        }

        if (rotaName === "user") {
            getPosts(setPosts, URL, rotaName, setuserInfos)
        }
    }, [URL, clickToggleFollowing])


    if (posts === null) {
        errorMessage = <StyledLoading> <div className='loading' /> </StyledLoading>
    }

    else if (posts.length === 0) {
        errorMessage = " There are no posts yet."
    }

    else if(posts[0].followingNoOne){
        errorMessage = " You don't follow anyone yet. Search for new friends!"
    }

    else if (posts.e) {
        errorMessage = "An error occured while trying to fetch the posts, please refresh the page"
    }


    return (
        <>
            {rotaName === "timeline" ?
                <>
                    <NewPost setPosts={setPosts} />
                    <StyledRefresh
                        onClick={() => {
                            setRefreshing(true);
                            getPosts(setPosts, URL)
                        }}>
                        {refreshing
                            ?
                            <StyledThreeDots>
                                <ThreeDots color="#fff" height={13} />
                            </StyledThreeDots>
                            : <RefreshNewPosts posts={posts} />
                        }
                    </StyledRefresh>

                </>
                : ""
            }
            {
                posts === null || posts.length === 0 || posts.e || posts[0].followingNoOne ?
                    errorMessage :
                    <AllPosts posts={posts} setPosts={setPosts} URL={URL} setuserInfos={setuserInfos}/>
            }
        </>

    )

}


export async function getPosts(setPosts, URL, rotaName, setuserInfos) {

    let { token } = JSON.parse(localStorage.getItem('userData'))
    const config = {
        headers: { authorization: token }
    }

    const requestPosts = axios.get(URL, config)
    requestPosts.then(res => {
        if (rotaName === "user") {
            setPosts([...res.data.posts]);
            setuserInfos({ ...res.data })
        } else { setPosts([...res.data]) }
    })
    requestPosts.catch(e => { setPosts({ e }) })

}

function AllPosts(props) {
    const { posts, setPosts, URL, setuserInfos } = props;
    return (
        posts.map((infos, key) => {
            return (

                <EachPost key={key} infos={infos} setPosts={setPosts} URL={URL} setuserInfos={setuserInfos}/>

            )
        })
    )
}

function EachPost(props) {
    let navigate = useNavigate()

    const { infos, setPosts, URL, setuserInfos } = props;

    if (infos.image === "") {
        infos.image = "https://archive.org/download/no-photo-available/no-photo-available.png"
    } // isso aqui pode vir do back já

    let liked = infos.liked
    let { userId } = JSON.parse(localStorage.getItem('userData'))
    let isUserPost = false;

    const [canDeletePost, setCanDeletePost] = useState(false)
    const [canEditPost, setCanEditPost] = useState(false)

    if (userId === infos.userId) {
        isUserPost = true;
    }

    function findHashtags(text) {
        text = text.split(' ')
        let html = []
        for (let i = 0; i < text.length; i++) {
            if (text[i][0] === '#') {
                const redirect = `/hashtag/${text[i].replace('#', '')}`
                const URL = `https://abef-linkr-api.herokuapp.com/hashtags/${text[i].replace('#', '')}`
                html.push(<Link to={redirect} onClick={() => { getPosts(setPosts, URL) }}> {text[i]}</Link>)
            } else {
                html.push(' ' + text[i])
            }
        }
        return (
            html
        )
    }



    return (

        <StyledEachPost key={infos.id}>

            {canDeletePost ? <ModalDelete infos={infos} setCanDeletePost={setCanDeletePost} setPosts={setPosts} URL={URL} setuserInfos={setuserInfos} /> : ""}
            <StyledBox >

                <StyledInfosLeft>
                    <StyledImg img={infos.picture} />

                    <Likes liked={liked} postId={infos.id} quantLikes={infos.likes} />
                </StyledInfosLeft>

                <StyledInfosRight>
                    {isUserPost ? <StyledCanEdit>
                        <ion-icon name="create-outline" onClick={(e) => {
                            if (canEditPost) {
                                setCanEditPost(false)
                            } else {
                                setCanEditPost(true);
                            }
                        }}>

                        </ion-icon>
                        <ion-icon name="trash-outline" onClick={(e) => {
                            setCanDeletePost(true)
                        }}>

                        </ion-icon>
                    </StyledCanEdit> : <></>}

                    <h6 onClick={() => { navigate(`/user/${infos.userId}`) }}>
                        {infos.userName}
                    </h6>

                    {canEditPost ?
                        <EditPost infos={infos} setCanEditPost={setCanEditPost} setPosts={setPosts} URL={URL} setuserInfos={setuserInfos} /> :
                        <p>
                            {findHashtags(infos.text)}
                        </p>}

                    <StyledEmbed onClick={() => { window.open(infos.link, "_blank"); }}>
                        <StyledEmbedTitle>
                            {infos.title}
                        </StyledEmbedTitle>
                        <StyledEmbedDescription>
                            {infos.description}
                        </StyledEmbedDescription>
                        <StyledEmbedLink>
                            {infos.link}
                        </StyledEmbedLink>
                        <StyledEmbedImg img={infos.image}>
                        </StyledEmbedImg>

                    </StyledEmbed>
                </StyledInfosRight>
            </StyledBox>
            <ScrollContainer>
            <Comment infosUser={infos} setPosts={setPosts} setuserInfos={setuserInfos}/>
            </ScrollContainer>
        </StyledEachPost>


    )
}

const ScrollContainer = styled.div`
    max-height: 250px;
    overflow-y: scroll;
    margin-bottom: 60px;
`


const StyledLoading = styled.div`
    width: 100%;
    height: 30vh;
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

const StyledThreeDots = styled.div`
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
    background-color: #1877F2;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

`

const StyledRefresh = styled.div`
    
`



const StyledCanEdit = styled.div`
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


const StyledEachPost = styled.div`
    width: 100%;
    padding: 15px 2%;
    margin-bottom: 30px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background-color: #171717;
    position: relative;

    @media (max-width: 640px) {
        border-radius: 0%;
    }
`

const StyledBox = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    padding-bottom: 10px;
`

const StyledInfosLeft = styled.div`
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


const StyledInfosRight = styled.div`
    width: 85%;
    position: relative;
    margin-bottom: 35px;

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

    a{
        text-decoration: none;
        color: white;

        &:hover{
            filter: brightness(80%);
        }
    }
    

`

const StyledEmbed = styled.div`
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

const StyledEmbedTitle = styled.h6`
    grid-column-start: 1;
    text-overflow: ellipsis;
    margin: 10px 20px;
    font-family: 'Lato';
    font-size: 16px;
    color: #CECECE;
`

const StyledEmbedDescription = styled.p`
    margin: 10px 20px;
    grid-column-start: 1;
    font-family: 'Lato';
    font-size: 11px;
    color: #9B9595;
`

const StyledEmbedLink = styled.p`
    margin: 10px 20px;
    grid-column-start: 1;
    font-family: 'Lato';
    font-size: 11px;
    color: #CECECE;
`

const StyledEmbedImg = styled.div`
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





const StyledImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;

`
