import axios from "axios"
import { useState } from "react"
import useInterval from "use-interval"
import dayjs from "dayjs"
import styled from "styled-components"

export default function RefreshNewPosts({posts}){

    const [qtd, setqtd] = useState(0)

    useInterval(() =>{
        if(posts !== null){
            if(posts.length === 0 || posts[0].followingNoOne){
                const data = dayjs('2022-06-13').format('YYYY-MM-DDTHH:mm:ss')
                getNumberNewPosts(data, setqtd)

            }else{
                getNumberNewPosts(posts[0].createdAt, setqtd)
            }
        }
    }, 5000)
    
    

    return(
        <>
            {
                qtd > 0 ? 
                <StyledRefreshNeuPost>
                {qtd} new posts, load more!
                </StyledRefreshNeuPost>
                : ""
            }
        </>
    )
}

function getNumberNewPosts(createdAt, setqtd){
    const { token } = JSON.parse(localStorage.getItem('userData'))
    const URL_COUNT_POSTS = "https://abef-linkr-api.herokuapp.com/count/posts"
    
    const config = {
        headers: { 
            authorization: token,
            createdAt : createdAt
        },
    }

  
    const request = axios.get(URL_COUNT_POSTS,  config);
    request.then((res) => {
        setqtd(res.data.count)});
    request.catch((e) => {console.log(e)})    

}


const StyledRefreshNeuPost = styled.button`
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
    color: white;
    background-color: #1877F2;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
`