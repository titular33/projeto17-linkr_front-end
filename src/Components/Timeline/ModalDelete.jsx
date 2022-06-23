import axios from "axios"
import { useContext, useState } from "react"
import { getPosts } from "./RenderPosts"
import { ThreeDots } from "react-loader-spinner"
import styled from "styled-components"
import HashTagsContext from "../../Contexts/HashTagsContext"

import { getHashTags } from "../HashtagBox"

export default function ModalDelete({ infos, setCanDeletePost, setPosts , URL, setuserInfos}) {

    let { token } = JSON.parse(localStorage.getItem('userData'))
    const [loading, setLoading] = useState(false)
    const URL_POST = "https://abef-linkr-api.herokuapp.com/post"

    const { hashTags, setHashTags } = useContext(HashTagsContext);



    function deletePost() {
        const config = {
            headers: { id: infos.id, authorization: token }
        }
        const requet = axios.delete(URL_POST, config);
        requet.then(() => { setCanDeletePost(false); getPosts(setPosts, URL, "user", setuserInfos); getHashTags(setHashTags) });
        requet.catch(() => { alert("Não foi possível deletar o post") })
    }

    return (
        <StyledModalDeletePost loading={loading} onClick={() => { setCanDeletePost(false) }}>
            <div>
                <p>Are you sure you want <br /> to delete this post?</p>
                <button className='no' disabled={loading} onClick={() => { setCanDeletePost(false) }}>No, go back</button>
                <button className='yes' disabled={loading} onClick={(e) => { setLoading(true); deletePost(); e.stopPropagation() }} >{loading ? <ThreeDots color="#fff" height={13} /> : "Yes, delete it"}</button>
            </div>
        </StyledModalDeletePost>
    )
}

const StyledModalDeletePost = styled.div`
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
        filter: ${props => { return props.loading ? 'brightness(60%)' : 'brightness(100%)' }};
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