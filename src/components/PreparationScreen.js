import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Header = styled.h1`
  color: #6f4e37;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
`;

const PreparationBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
`;

const DrinkInfo = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const DrinkName = styled.h2`
  color: #6f4e37;
  margin: 0 0 10px 0;
  font-size: 24px;
`;

const StatusMessage = styled.p`
  font-size: 20px;
  color: ${props => props.isCompleted ? '#4a8f3c' : '#333'};
  margin: 20px 0;
  text-align: center;
  font-weight: ${props => props.isCompleted ? 'bold' : 'normal'};
`;

const CompletionIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #4a8f3c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  font-size: 40px;
`;

const Instructions = styled.p`
  color: #666;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;

// Animation for coffee pouring
const CoffeeMachine = styled.div`
  width: 200px;
  height: 100px;
  background-color: #6f4e37;
  border-radius: 10px;
  position: relative;
  margin-bottom: 20px;
`;

const CoffeeStream = styled.div`
  width: 10px;
  height: ${props => props.isPouring ? '80px' : '0'};
  background-color: #3e2723;
  position: absolute;
  bottom: -80px;
  left: 95px;
  transition: height 2s;
`;

const CoffeeCup = styled.div`
  width: 60px;
  height: 70px;
  background-color: #f5f5f5;
  border-radius: 0 0 30px 30px;
  position: absolute;
  bottom: -120px;
  left: 70px;
  border: 5px solid #e0e0e0;
  border-top: none;
  
  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 30px;
    border-radius: 10px;
    border: 5px solid #e0e0e0;
    right: -25px;
    top: 15px;
  }
`;

const CoffeeLevel = styled.div`
  width: 100%;
  height: ${props => props.level}%;
  background-color: #3e2723;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 25px 25px;
  transition: height 2s;
`;

const PreparationScreen = ({ drink, status, isCompleted }) => {
  if (!drink) return null;
  
  return (
    <Container>
      <Header>Приготовление напитка</Header>
      
      <PreparationBox>
        <DrinkInfo>
          <DrinkName>{drink.name}</DrinkName>
        </DrinkInfo>
        
        {!isCompleted ? (
          <>
            <CoffeeMachine>
              <CoffeeStream isPouring={true} />
            </CoffeeMachine>
            <CoffeeCup>
              <CoffeeLevel level={50} />
            </CoffeeCup>
            <StatusMessage>{status}</StatusMessage>
            <Instructions>
              Нажмите V для успешного приготовления или F для ошибки
            </Instructions>
          </>
        ) : (
          <>
            <CompletionIcon>✓</CompletionIcon>
            <StatusMessage isCompleted={true}>{status}</StatusMessage>
          </>
        )}
      </PreparationBox>
    </Container>
  );
};

export default PreparationScreen; 