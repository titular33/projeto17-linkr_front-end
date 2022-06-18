import { 
    Container,
    Logo, 
    ImageUser, 
    ChevronIcon, 
    QuickAccess,
    InputBox,
} from "./styled";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function Header() {
    const [quickAccess, setQuickAccess] = useState(false);
    const [userData, setUserData] = useState({});
    const logoff = () => {
        setUserData('');
        localStorage.removeItem('userData');
    }
    const { token, picture } = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {
        function OutsideClick(e) {
            if (quickAccess && token.current && !token.current.contains(e.target)) {
              setQuickAccess(false)
            }
        }

        document.addEventListener("mousedown", OutsideClick)

        return () => {
            document.removeEventListener("mousedown", OutsideClick)
        }
    }, [quickAccess]);


    return(
        <Container token={token}>
            <Logo to="/timeline">Linkr</Logo>

            <InputBox>
                <SearchBar/>
            </InputBox>

            <ImageUser 
                src={picture}
                onClick={() => setQuickAccess(!quickAccess)}
                alt="profile picture"
            />

            <ChevronIcon
                transfrom={quickAccess ? "rotate(180deg)" : "rotate(0deg)"}
                onClick={() => setQuickAccess(!quickAccess)}
                size="30px"
            />

            <QuickAccess to="#" token={token} display={quickAccess ? "inherit" : "none"}>
                <Link to="/">
                    <span onClick={() => logoff()} >Logout</span>
                </Link>
            </QuickAccess>
        </Container>
    );
}