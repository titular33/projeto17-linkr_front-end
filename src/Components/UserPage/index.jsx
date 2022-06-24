import { useParams } from "react-router-dom"
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";



import RenderPosts from "../Timeline/RenderPosts";
import Header from '../Header';
import SearchBar from "../SearchBar";
import HashtagContainer from "../HashtagBox";
//import { getPosts } from "../Timeline/RenderPosts";



export default function UserPage() {

    const params = useParams()

    // const [URL, setURL] = useState(`https://abef-linkr-api.herokuapp.com/user/${params.id}`)
    const [URL, setURL] = useState(`https://abef-linkr-api.herokuapp.com/user/${params.id}`)
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

                    <StyledPicture >
                        <StyledImg picture={userInfos.picture}>

                        </StyledImg>
                        <h1>
                            {userInfos.userName}'s Posts
                        </h1>
                    </StyledPicture>

                    {thisUserId.userId === userInfos.id || userInfos.userName === "" ? <></> :
                        <StyledButton type="button"
                            disabled={disabled}
                            className={`${disabled}`}
                            background={userInfos.following ? "white" : "#1877F2"}
                            color={userInfos.following ? "#1877F2" : "white"}


                            onClick={(e) => {
                                disabled ? setDisabled(false) : setDisabled(true)
                                toggleFollow(userInfos, clickToggleFollowing, setClickToggleFollowing, disabled, setDisabled);

                            }}>
                            {userInfos.following ? "Unfollow" : "Follow"}
                        </StyledButton>
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

    const URL_Follow = `https://abef-linkr-api.herokuapp.com/${route}`

    const { token } = JSON.parse(localStorage.getItem('userData'))
    const config = {
        headers: { authorization: token, id: userInfos.id }
    }

    const request = axios.post(URL_Follow, {}, config);
    request.then((res) => {
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
    grid-template-rows: 50px  100px  fit-content(10%) fit-content(10%);
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
        .navBar{
            display: none;
        }
        .section{
            grid-column-start: 1;
            grid-column-end:8;
            width: 100%;
        }

    }
    
`

const InputSearchBar = styled.div`
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 1;
    height: 200px;
    display: inline-flex;
    justify-content: center;
    background-color: purple;
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

    @media (max-width: 1080px) {
        grid-template-columns: 1fr
    }

    @media (max-width: 640px) {
            width: 90%;
            grid-column-start: 1;
            grid-column-end: 8;
            display: inline-flex;
            justify-content: center;
            display: block;
    }
    

    `
    const StyledPicture = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        grid-column-start:1;
        grid-column-end:2 ;
    
        & > h1{
            width: 100%;
            grid-column-start: 1;
            grid-column-end: 2;
            font-family: 'Oswald';
            font-weight: 700;
            font-size: 43px;
            color: white;
            justify-self: left;
    
            @media (max-width: 1080px) {
                font-size:33px 
            }
            @media (max-width: 640px) {
                font-size: 33px;
            }
            
        }
    `
const StyledButton = styled.button`
    grid-column-start: 2;
    grid-column-end: 3;
    display: block;
    width: 110px;
    color:  ${props => props.color};;
    background-color: ${props => props.background};
    position: relative;
    left: 190px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    
    & .true{
        filter: brightness(90%);
        cursor: default;
    }

    @media (max-width: 1080px) {
        position: inherit;
    }
    @media (max-width: 640px) {
        margin-top: 20px;
        height: 30px;
        width: 100%;
    }
`

const StyledImg = styled.div`
    background-image: url(${props => props.picture});
    background-size: cover;
    background-position: center;
    width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    /* background-color: red; */
    
`
const StyledNavbar = styled.div`
    width: 100%;
    max-width: 300px;
    grid-column-start: 5;
    grid-column-end: 7;
    position: sticky;
    top: 230px;
    `
