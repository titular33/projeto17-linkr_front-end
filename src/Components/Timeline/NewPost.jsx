import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';



export default function NewPost({setPosts}) {
    const URL_POST = "http://127.0.0.1:4000/post"
    const URL_GET = "http://127.0.0.1:4000/timeline"


    const { token, picture } = JSON.parse(localStorage.getItem('userData'))
    const config = {
        headers: { authorization: token }
    }


    const [infosTopost, setInfosToPost] = useState({ link: "", text: "" })
    const [disabled, setDisabled] = useState(false) 
    const [errorPost, setErrorPost] = useState(false)


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
            requestPosts.then(res => { setPosts(res.data); setErrorPost(false) })
            requestPosts.catch(e => { setPosts({ e }) })
            
        }
        setDisabled(false)
    }

    return (
        <$AuxBody>

            <$InfosLeft>
                <$Img img={picture} />
            </$InfosLeft>

            <$InfosRight>
                <h6>
                    What are you going to share today?
                </h6>
                <$Form onSubmit={(e) => { e.preventDefault(); setDisabled(true);tryPost(); }}>
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
                </$Form>
                {errorPost ? <$Error> There was an error posting your link </$Error> : ""}
            </$InfosRight>
        </$AuxBody>
    )
}

const $AuxBody = styled.div`
    width: 100%;
    padding: 15px;
    margin-bottom: 30px;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 15% 85%;
    background-color: white;
`


const $InfosLeft = styled.div`
    grid-column-start:0;
    grid-column-start:1;

`
const $InfosRight = styled.div`
    grid-column-start:1;
    grid-column-start:2;

    h6{
        font-family: 'Lato';
        font-weight: 300;
        font-size: 20px;
        color: #707070;
    }

    
`

const $Img = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;
`


const $Form = styled.form`
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
        resize: none;
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

const $Error = styled.p`
    color: red;
`