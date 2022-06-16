import { 
    Container,
    Logo, 
    ImageUser, 
    ChevronIcon, 
    QuickAccess,
    InputBox,
    BoxIconInput,
} from "./styled";

import { AiOutlineSearch } from 'react-icons/ai';

import { useState, useRef, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import {SearchBar} from "../SearchBar";

export default function Header() {
    const [quickAccess, setQuickAccess] = useState(false);
    const [userData, setUserData] = useState({});

    let ref = useRef();
    const logoff = () => {
        setUserData('');
        localStorage.removeItem('userData');
    }

    useEffect(() => {
        function OutsideClick(e) {
            if (quickAccess && ref.current && !ref.current.contains(e.target)) {
              setQuickAccess(false)
            }
        }

        document.addEventListener("mousedown", OutsideClick)

        return () => {
            document.removeEventListener("mousedown", OutsideClick)
        }
    }, [quickAccess]);


    return(
        <Container ref={ref}>
            <Logo to="/timeline">Linkr</Logo>

            <InputBox>
                <SearchBar/>
                <BoxIconInput><AiOutlineSearch /></BoxIconInput>
            </InputBox>

            <ImageUser 
                src={userData.photoUrl}
                onClick={() => setQuickAccess(!quickAccess)}
                alt="profile picture"
            />

            <ChevronIcon
                transfrom={quickAccess ? "rotate(180deg)" : "rotate(0deg)"}
                onClick={() => setQuickAccess(!quickAccess)}
                size="30px"
            />

            <QuickAccess to="#" ref={ref} display={quickAccess ? "inherit" : "none"}>
                <Link to="/">
                    <span onClick={() => logoff()} >Logout</span>
                </Link>
            </QuickAccess>
        </Container>
    );
}