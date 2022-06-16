import styled from "styled-components"

export default function NewPost() {

    const { token, userName, picture } = JSON.parse(localStorage.getItem('userData'))


    return (
        <$AuxBody>

            <$InfosLeft>
                <$Img img={picture} />
                <p>
                </p>
            </$InfosLeft>

            <$InfosRight>
                <h6>
                    What are you going to share today?
                </h6>
                <$Form action="">
                    <input type="url" placeholder="http(s)://..." />
                    <textarea name="cometario-link" placeholder="Awesome article about #javascript"></textarea>
                    <button type="submit"> Publish </button>
                </$Form>
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
        }
   }
`