import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';
import ModalRedirectPerfil from "./ModalRedirectPerfil";
import HashTagsContext from "../../Contexts/HashTagsContext";
import { getHashTags } from "../HashtagBox";

import HashtagContainer from "../HashtagBox";
import { useNavigate } from "react-router-dom";

export default function NewPost({setPosts}) {
    const URL_POST = "https://abef-linkr-api.herokuapp.com/post"
    const URL_GET = "https://abef-linkr-api.herokuapp.com/timeline"
    const navigate = useNavigate()

    const { token, picture, userId } = JSON.parse(localStorage.getItem('userData'))
    const config = {
        headers: { authorization: token }
    }


    const [infosTopost, setInfosToPost] = useState({ link: "", text: "" })
    const [disabled, setDisabled] = useState(false) 
    const [errorPost, setErrorPost] = useState(false)
    const [createdNewPost, setCreatedNewPost] = useState(false)

    const { hashTags, setHashTags } = useContext(HashTagsContext);


    async function tryPost() {
        let error = false;
        try {
            await axios.post(URL_POST, infosTopost, config);
        } catch (e) {
            error = true
            console.log(e)
            setErrorPost(true)
        }

        if (!error) {
            setInfosToPost({ link: "", text: "" })
            const requestPosts = axios.get(URL_GET, config)
            requestPosts.then(res => { 
                // setPosts(res.data); 
                setErrorPost(false); 
                getHashTags(setHashTags);
                setCreatedNewPost(true)
            })
            requestPosts.catch(e => { setPosts({ e }) })
            
        }
        setDisabled(false)
    }

    return (
        <StyledAuxBody>
            {createdNewPost ? <ModalRedirectPerfil setCreatedNewPost={setCreatedNewPost}/> : <></>}

            <StyledInfosLeft>
                <StyledImg img={picture} onClick={() =>{navigate(`/user/${userId}`)}}/>
            </StyledInfosLeft>

            <StyledInfosRight>
                <h6>
                    What are you going to share today?
                </h6>
                <StyledForm onSubmit={(e) => { e.preventDefault(); setDisabled(true);tryPost(); }}>
                    <input
                                            className={`${disabled}`}

                        disabled={disabled}
                        type="url"
                        placeholder="http(s)://..."
                        required
                        value={infosTopost.link}
                        onChange={e => { setInfosToPost({ ...infosTopost, link: e.target.value }); setErrorPost(false) }}
                    />
                    <textarea
                                            className={`${disabled}`}

                        disabled={disabled}
                        name="cometario-link"
                        placeholder="Awesome article about #javascript"
                        value={infosTopost.text}
                        onChange={e => { setInfosToPost({ ...infosTopost, text: e.target.value }); setErrorPost(false) }}
                    >
                    </textarea>
                    <button
                        className={`${disabled}`}
                        disabled={disabled}
                        type="submit">
                        {disabled ?  <ThreeDots color="#fff" height={13}/> : "Publish"}
                    </button>
                </StyledForm>
                {errorPost ? <StyledError> There was an error posting your link </StyledError> : ""}
            </StyledInfosRight>
        </StyledAuxBody>
    )
}

const StyledAuxBody = styled.div`
    width: 100%;
    padding: 15px;
    margin-bottom: 30px;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 15% 85%;
    background-color: white;
    @media (max-width: 640px) {
        border-radius: 0%;
    }
`


const StyledInfosLeft = styled.div`
    grid-column-start:1;
    grid-column-end:2;

`
const StyledInfosRight = styled.div`
    grid-column-start:2;
    grid-column-end:3;

    h6{
        font-family: 'Lato';
        font-weight: 300;
        font-size: 20px;
        color: #707070;
    }

    
`

const StyledImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;
    cursor: pointer;
`


const StyledForm = styled.form`
    margin: 10px 0pc;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    input{
        display: block;
        width: 100%;
        height: 30px;
        background-color: #EFEFEF;
        color: #707070;
        border: none;
        border-radius: 5px;
        padding: 5px;
        font-family: 'Lato';
        font-weight: 300;
        font-size: 15px;
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */
        &:hover{
            filter: brightness(95%);
        }
        &.true{
            filter: brightness(80%);
        }
    }

    textarea{
        display: block;

        width: 100%;
        height: 65px;
        overflow-y: scroll;
        background-color: #EFEFEF;
        color: #707070;
        border: none;
        border-radius: 5px;
        resize: vertical;
        padding: 5px;
        font-family: 'Lato';
        font-weight: 300;
        font-size: 15px;
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */

        &:hover{
            filter: brightness(95%);
        }
        &.true{
            filter: brightness(80%);
        }
    }

    button{
        display: block;
        width: 110px;
        height: 30px;
        background: #1877F2;
        border: none;
        border-radius: 5px;
        color: white;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover{
            filter: brightness(95%);
            cursor: pointer;
        }
        &.true{
            cursor: default;
            filter: brightness(80%);
        }
   }
`

const StyledError = styled.p`
    color: red;
`