import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function ModalRedirectPerfil({ setCreatedNewPost }) {

    const navigate = useNavigate();
    const { userId } = JSON.parse(localStorage.getItem('userData'))
    

    return (
        <StyledModal  onClick={() => { setCreatedNewPost(false) }}>
            <div>
                <p> Post created successfully! <br />  <br /> Would you like to be redirected to your profile?</p>
                <button className='no' onClick={() => { setCreatedNewPost(false) }}>No! </button>
                <button className='yes' onClick={(e) => { setCreatedNewPost(false); navigate(`/user/${userId}`)}} > Yes! </button>
            </div>

        </StyledModal>
    )
}

const StyledModal = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div{
        display: grid;
        grid-template-columns: 1fr 1fr; 
        background-color: #333333;
        border-radius: 50px;
        padding: 60px 130px;
        gap: 30px;
        justify-items: center;
        align-items: center;
        /* filter: ${props => { return props.loading ? 'brightness(60%)' : 'brightness(100%)' }}; */
    }
    
    & > div p{
        grid-column-start: 1;
        grid-column-end: 3;

        font-family: 'Lato';
        font-weight: 700;
        font-size: 34px;
        color: #FFFFFF;
        text-align: center;
    }

    
    & > div .no{
        grid-column-start: 1;
        grid-column-end: 2;
        width: 140px;
        height: 40px;
        padding: 5px 15px;

        border: none;
        border-radius: 5px;

        background-color: white;
        color: #1877F2;

        font-family: 'Lato';
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
        
    }
    
    & > div .yes{
        grid-column-start: 2;
        grid-column-end: 3;
        padding: 5px 15px;

        width: 140px;
        height: 40px;

        border: none;
        border-radius: 5px;
        cursor: pointer;

        background-color: #1877F2;
        color: white;

        font-family: 'Lato';
        font-weight: 700;
        font-size: 18px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`