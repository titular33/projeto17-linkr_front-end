import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import { getPosts } from "./RenderPosts";
import styled from "styled-components";
import { getHashTags } from "../HashtagBox";
import HashTagsContext from "../../Contexts/HashTagsContext";

export function EditPost({ infos, setCanEditPost, setPosts, URL, setuserInfos }) {
    const [infosToEdit, setInfosToEdit] = useState({})
    let { token } = JSON.parse(localStorage.getItem('userData'))
    const textEdit = useRef(null)
    const URL_POST = "https://abef-linkr-api.herokuapp.com/post"

    const { hashTags, setHashTags } = useContext(HashTagsContext);


    useEffect(() => {
        setInfosToEdit({ link: infos?.link, text: infos?.text })
        textEdit.current.focus()
    }, [])

    function putPost() {
        const config = {
            headers: { id: infos.id, authorization: token }
        }

        const requet = axios.put(URL_POST, infosToEdit, config);
        requet.then(() => { setCanEditPost(false); getPosts(setPosts, URL, "user", setuserInfos); getHashTags(setHashTags) });
        requet.catch(() => { alert("Não foi possível editar o post") })
    }

    return (
        <StyledInputEditPost onKeyUp={(e) => {
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

        </StyledInputEditPost>
    )
}

const StyledInputEditPost = styled.div`
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