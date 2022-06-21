import styled from 'styled-components';
import Header from '../Header';
import RenderPosts from './RenderPosts';
import HashtagContainer from '../HashtagBox'
import SearchBar from '../SearchBar';

export default function GetTimeline() {


    return (
        <>
            <Header />
            <$AuxBody className='auxBody'>
                <InputSearchBar className='searchBar'>
                    <SearchBar />
                </InputSearchBar>
                <h1>
                    timeline
                </h1>
                <$Section className='section'>
                    <RenderPosts />

                </$Section>
                <$Navbar className='navBar'>
                    <HashtagContainer />
                </$Navbar>
            </$AuxBody>
        </>
    )
}



const $AuxBody = styled.div`
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

    & > h1{
        grid-column-start: 2;
        grid-column-end: 5;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        color: white;
        justify-self: left;
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


const $Section = styled.div`
    width: 100%;
    grid-column-start: 2;
    grid-column-end: 5;
    
`


const $Navbar = styled.div`
    width: 100%;
    max-width: 300px;
    grid-column-start: 5;
    grid-column-end: 7;
`