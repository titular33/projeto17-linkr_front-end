import styled from 'styled-components';
import {Link} from "react-router-dom"

const trending = ['javascript', 'react', 'react-native', 'material', 'web-dev', 'mobile', 'css', 'html', 'node', 'sql']

export default function hashtagContainer() {
return (
        <Container>
            <div>
              <h1>
                trending
              </h1>
            </div>
            <div className='line'/>
            <div> 
              {trending.map(themes => 
                <h2 >
                  <Link to={`/hashtag/${themes}`}>
                    {'#'+themes}
                  </Link>
                </h2>)}
            </div>
        </Container>
    );  
}
    
const Container = styled.div`
  
  a:link {
  text-decoration: none;
  color: white;
  }

  a:visited {
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: none;
    color: white;
  }

  a:active {
    text-decoration: none;
    color: white;
  }

  background-color: #171717;
  border-radius: 16px;
  width: 301px;
  height: 406px;

  h1 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    color: white;
    padding-top: 9px;
    margin-left: 16px;
  };
  .line {
    margin-top: 12px;
    margin-bottom: 22px;
    width: 100%;
    border: 1px solid #484848;
  }
  h2{
    margin-left: 16px;
    font-family: Lato;
    font-size: 19px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0.05em;
    text-align: left;
    color: white;
    margin-bottom: 7px;
  }
 `