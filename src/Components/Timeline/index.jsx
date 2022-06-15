import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function GetTimeline(){
    const URL = "http://127.0.0.1:4000/timeline"

    let navigate =  useNavigate()

    const [posts, setPosts] = useState(null)

    useEffect(() =>{
        const requestPosts = axios.get(URL)
        requestPosts.then(res => {setPosts(res.data)})
        requestPosts.catch( e => {alert("algo deu errado, recarregue a página!")})
    }, [])

    return(
        <>
            {posts === null ? "Teste 1" : posts}
        </>
    )
}