import styled from 'styled-components';

const Banner = () => {
    return (
        <Container>
            <h1>linkr</h1>
            <h2>save, share and discover the best links on the web</h2>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 62.84%;
    min-height: 100vh;
    background: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

    h1{
        margin-left: 16%;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }

    h2{
        margin-left: 16%;
        width: 442px;
        height: 128px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`
export default Banner;