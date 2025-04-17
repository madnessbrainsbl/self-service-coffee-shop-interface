import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  color: #6f4e37;
  margin-bottom: 30px;
  font-size: 32px;
  text-align: center;
`;

const DrinkList = styled.div`
  width: 100%;
`;

const DrinkCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

const DrinkName = styled.h2`
  color: #6f4e37;
  margin: 0 0 10px 0;
  font-size: 22px;
`;

const DrinkDescription = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0 0 15px 0;
`;

const DrinkPrice = styled.div`
  color: #4a8f3c;
  font-weight: bold;
  font-size: 18px;
  text-align: right;
`;

const DrinkSelection = ({ drinks, onSelect }) => {
  return (
    <Container>
      <Header>Выберите напиток</Header>
      <DrinkList>
        {drinks.map(drink => (
          <DrinkCard key={drink.id} onClick={() => onSelect(drink)}>
            <DrinkName>{drink.name}</DrinkName>
            <DrinkDescription>{drink.description}</DrinkDescription>
            <DrinkPrice>{drink.price} ₽</DrinkPrice>
          </DrinkCard>
        ))}
      </DrinkList>
    </Container>
  );
};

export default DrinkSelection; 