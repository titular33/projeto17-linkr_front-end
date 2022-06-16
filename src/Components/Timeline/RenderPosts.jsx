import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import NewPost from './NewPost';

export default function RenderPosts() {
    const URL = "http://127.0.0.1:4000/timeline"
    let navigate = useNavigate()

    let { token } = JSON.parse(localStorage.getItem('userData'))
    let errorMessage = "";


    const [posts, setPosts] = useState(null)
    console.log("setPosts", setPosts)

    useEffect(() => {

        const config = {
            headers: { authorization: token }
        }
        const requestPosts = axios.get(URL, config)
        requestPosts.then(res => { setPosts(res.data) })
        requestPosts.catch(e => { setPosts({ e }) })
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
            <NewPost setPosts={setPosts}/>
            {
                posts === null ||  posts.length === 0 || posts.e ?
                errorMessage :
                <AllPosts posts={posts} /> 
            }
        </>

    )

}

function AllPosts(props) {
    const { posts } = props;

    return (
        posts.map(infos => {
            return (

                <EachPost infos={infos} key={infos.id + infos.createdAt} />

            )
        })
    )
}

function EachPost(props) {


    const { infos } = props;


    return (

        <$EachPost>
            <$Box >

                <$InfosLeft>
                    <$Img img={infos.picture} />
                    <ion-icon name="heart-outline"></ion-icon>
                    <p>
                        XX likes
                    </p>
                </$InfosLeft>

                <$InfosRight>
                    <h6>
                        {infos.userName}
                    </h6>
                    <p>
                        {infos.text}
                    </p>
                    <p>

                        infosMetaData
                    </p>
                </$InfosRight>
            </$Box>
        </$EachPost>
    )
}

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
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const $InfosLeft = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;

    p{
        color: white;
        font-family: 'Lato';
        font-size: 11px;
    }

    ion-icon[name="heart-outline"]{
        color: white;
        background-color: red;
    }
`


const $InfosRight = styled.div`
    width: 85%;

    h6{
        color: white;
        font-family: 'Lato';
        font-size: 19px;
        padding: 7px 0px;
    }

    p{
        color: white;
        font-family: 'Lato';
        font-size: 17px;
        padding: 7px 0px;
    }

`
const $Img = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;

`