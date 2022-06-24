import { 
    Container,
    Logo, 
    ImageUser, 
    ChevronIcon, 
    QuickAccess,
    InputBox,
} from "./styled";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [quickAccess, setQuickAccess] = useState(false);
    const logoff = () => {
        localStorage.removeItem('userData');
    }
    const { token, picture, userId } = JSON.parse(localStorage.getItem('userData'))
    
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

    const navigate = useNavigate();
    function profileRoute() {
        navigate(`/user/${userId}`);
    }

    return(
        <Container token={token}>
            <Logo to="/timeline">Linkr</Logo>

            <InputBox>
                <SearchBar/>
            </InputBox>

            <ImageUser 
                src={picture}
                onClick={() => profileRoute()}
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