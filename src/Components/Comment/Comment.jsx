import React from 'react'
import styled from 'styled-components'

export default function Comment() {
  return (
    <Container>
      <Content>
        <div className='left'>
          <div className='profilePic'>
            <img src='https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg' alt='profilePicOfUser'/>
          </div>
        </div>

        <div className='right'>
          <div className='userName'>
            <h1>
              Usuário Leão
            </h1>
            <h2>
              • following
            </h2>
          </div>
          <div className='textContent'>
            <h3>O leão [feminino: leoa] (nome científico: Panthera leo) é uma espécie de mamífero carnívoro do gênero Panthera e da família Felidae. A espécie é atualmente encontrada na África subsaariana e na Ásia, com uma única população remanescente em perigo, no Parque Nacional da Floresta de Gir, Gujarat, Índia.
</h3>
          </div>
        </div>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  min-height: 75px;
  width: 611px;
  border-radius: 16px;
  background-color: #1E1E1E;
  
`
const Content = styled.div`
  display: flex;
  .profilePic{
    width: 40px;
    height: 40px;
    background-color: red;
    border-radius: 100%;
    margin-top: 15px;
    margin-left: 25px;
  }
  .right{
    margin-left: 18px;
  }
  .userName{
    display: flex;
    margin-top: 12px;  
  }
  .profilePic img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
  h1{
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
  }
  h2{
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #565656;
    margin-top: 3.3px;
    margin-left: 4px;
  }
  h3{
    color: #ACACAC;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding-bottom: 18px;
    text-align:justify;
    padding-right: 18px;
  }
`