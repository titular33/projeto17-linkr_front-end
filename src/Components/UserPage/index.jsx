import { useParams } from "react-router-dom"
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";


import RenderPosts from "../Timeline/RenderPosts";
import Header from '../Header';
import SearchBar from "../SearchBar";
import HashtagContainer from "../HashtagBox";
//import { getPosts } from "../Timeline/RenderPosts";



export default function HashtagPage() {

    const params = useParams()
    //const URL = "https://abef-linkr-api.herokuapp.com/user/"+ `${params.id}`
    //const token = JSON.parse(localStorage.getItem('userData')).token;

    //console.log(params)

    // const [URL, setURL] = useState(`https://abef-linkr-api.herokuapp.com/user/${params.id}`)
    const [URL, setURL] = useState(`http://localhost:4000/user/${params.id}`)
    const [userInfos, setuserInfos] = useState({ userName: "", following: false })
    const [clickToggleFollowing, setClickToggleFollowing] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const thisUserId = JSON.parse(localStorage.getItem('userData'))

    return (
        <>
            <Header />
            <StyledAuxBody>

                <InputSearchBar className='searchBar'>
                    <SearchBar />
                </InputSearchBar>
                <StyledTitle>

                    <h1>
                        {userInfos.userName}'s Posts
                    </h1>

                    {thisUserId.userId === userInfos.id || userInfos.userName === "" ? <></> :
                        <button type="button" disabled={disabled} className={`${disabled}`} onClick={(e) => {
                            disabled ? setDisabled(false) : setDisabled(true)
                            toggleFollow(userInfos, clickToggleFollowing, setClickToggleFollowing, disabled, setDisabled);

                        }}>
                            {userInfos.following ? "Unfollow" : "Follow"}
                        </button>
                    }
                </StyledTitle>
                <StyledSection className='section'>
                    <RenderPosts rotaName={"user"} URL={URL} setuserInfos={setuserInfos} clickToggleFollowing={clickToggleFollowing} />

                </StyledSection>
                <StyledNavbar className='navBar'>
                    <HashtagContainer setURL={setURL} />
                </StyledNavbar>

            </StyledAuxBody>
        </>
    )
}

function toggleFollow(userInfos, clickToggleFollowing, setClickToggleFollowing, disabled, setDisabled) {

    let route = ''
    userInfos.following ? route = 'unfollow' : route = 'follow'

    const URL_Follow = `http://localhost:4000/${route}`

    const { token } = JSON.parse(localStorage.getItem('userData'))
    const config = {
        headers: { authorization: token, id: userInfos.id }
    }


    const request = axios.post(URL_Follow, {}, config);
    request.then((res) => {
        // window.location.reload()
        //setURL(`http://localhost:4000/user/${params.id}`)
        clickToggleFollowing ? setClickToggleFollowing(false) : setClickToggleFollowing(true)
        setDisabled(false);
    })
    request.catch((e) => {
        console.log(e)
    })
}






const StyledAuxBody = styled.div`
    margin-top: 150px;
    width: 100%;
    min-height: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px 50px fit-content(10%) fit-content(10%);
    /* justify-content: center; */
    justify-items: left;
    gap: 25px;
    position: relative;

    .searchBar{
        display: none;
    }

    
    @media (max-width: 1080px) {
        .navBar{
        display: none;
        }
        .section{
            grid-column-start: 2;
            grid-column-end: 7;
        }
    }

    @media (max-width: 640px) {

        & {
        justify-content: space-evenly;
        justify-items: center;
        position: relative;
        margin-top: 10px;
        }
        
        &>h1{
            grid-column-start: 1;
            grid-column-end:8;
            justify-self: start;
            margin-left: 5%;
            
        }
        .navBar{
            display: none;
        }
        .section{
            grid-column-start: 1;
            grid-column-end:8;
            width: 100%;
            
        }
        .searchBar{
            display: contents;
            width: 90%;
            grid-column-start: 1;
            grid-column-end: 8;
            grid-row-start: 1;
            height: 30px;
            display: inline-flex;
            justify-content: center;

        }

    }
    
`

const InputSearchBar = styled.div`
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 1;
    height: 30px;
    display: inline-flex;
    justify-content: center;
    /* position: absolute;
    top: 0px;
    left: 0px; */
    `

const StyledSection = styled.div`
    width: 100%;
    grid-column-start: 2;
    grid-column-end: 5;
    
    `

const StyledTitle = styled.div`
    width: 100%;
    grid-column-start: 2;
    grid-column-end: 7;

    display: grid;
    grid-template-columns: 6fr 4fr;
    justify-content: left;
    gap: 25px;

    & > h1{
        width: 100%;
        grid-column-start: 1;
        grid-column-end: 2;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        color: white;
        justify-self: left;
    }

    & > button{
        grid-column-start: 2;
        grid-column-end: 3;
        display: block;
        width: 110px;
        background-color: #1877F2;
        color: white;
        position: relative;
        left: 190px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }

    & > .true{
        filter: brightness(90%);
        cursor: default;
    }
`
const StyledNavbar = styled.div`
    width: 100%;
    max-width: 300px;
    grid-column-start: 5;
    grid-column-end: 7;
    position: sticky;
    top: 230px;
`
