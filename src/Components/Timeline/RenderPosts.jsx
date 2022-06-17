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
        infos.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAXVBMVEXv7+9mZmbs7OxfX1/39/d+fn6np6fX19fz8/POzs55eXlbW1uDg4PS0tJkZGRhYWFqamrn5+eLi4tWVlbh4eGUlJSqqqqhoaH7+/u+vr5vb2/Jycm/v7+Ojo6wsLDYus8vAAADXElEQVR4nO3b6XLiOhCGYWshtG0siWVCljNz/5c5LQhhiWAyFacO8rzPv2Bw1eeW1LIJTQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADcYMXKCKfRs4gd4TzfbT7MxzFUkFY6F3v3devYt2MMku/lZ6GbjWCR+uH+02ptR6mJLMY5z/eSbpQRKJq2itqOM99Ie39Ie4u91lUnmPZq1kmmFZHmSuDppZXN0G6ubIgnltbKZuvi2vzYSGlATyytn3frZFIMaVMq7sTSNj+jCSlq3lVT+MS00srcGZNCSsa4eeH4xNI+uxQ1qta3f55+bZ9dfNGwOpLjP5B23ufK5rjrtnC86rTiP7y0iPu0oZtWB7LWv66WFyuvH2La5Q2vpVgVp/Wvyc2Wl28dOuN699L6afVbaVN86WcXoazY/349vi7FyuWFaCpOK63J3SZ254+areb1XrfJxTuhWtP6IUQTc9zZ6cv27W7A7p6V7+prT26IKk0rw9vau1t9S5tEtRvOZ3d/daaVoQ+HtMl11743kW0n9ddW2vAeVjeJujIXM/itc4s8pt9fqTGtNtWYjrUtxc3zVx7WenOwypU91LfCtNp6jpXdi7O8zThZh2VpZRvy3Har/PfbgerSWhlMNJfiru+edZ0HF0Me5+uf9n2pri6tb81lZQ9xT3usf3RBB7ne2afdYN5/vLa0MiQX0se0eWU+dCLJq3EurDbkoIl1MNva0tpcOh3GpcruqtsdMlldjU/fFsLK79eputLqpuLjnD1w3X52Wvu07c/f5xa+vrR+cLEwio/V3Rc3h81z9jjMjVlIPlRTWtGw17O+x9VNRZ7Zx+uSH7m6RS58NWlz67md1bz13e2Hqa25damSmtLqLd4f0+oEXe777KWQd1X1fKPp2+RuzNlDFcNLviShlDeumlUlaeeD3rxfaz5nY1ZbbGEQpD7F+GPRz+8/re/MQxfMrfX4mLYs5EsVQ6ygtr5zn5izn1FDWulKm8Wppn3qPjGIJ5NW5+1ISHtv/r20I0zcVEva3sWv/3uynmJdQdrm18Moto/bzf8d5RPEy5MfQeEL3/sjdpxfP4zzY4zvZhu7zE8Uv2pZ/uYPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg7/0G6cMyGr/MjwcAAAAASUVORK5CYII="
    } // isso aqui pode vir do back já

    let liked = infos.liked
    let { userId, token } = JSON.parse(localStorage.getItem('userData'))
    let isUserPost = false;

    if (userId === infos.userId) {
        isUserPost = true;
    }

    function deletePost(){
        const config = {
            headers: { id: infos.id,  authorization: token}
        }
        const requet = axios.delete("http://127.0.0.1:4000/post", config);
        requet.then(() =>{getPosts(setPosts)});
        requet.catch(() =>{alert("Não foi possível deletar o post")})
    }

    return (

        <$EachPost>
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
                            deletePost();
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