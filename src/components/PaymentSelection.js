import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  color: #6f4e37;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
`;

const DrinkInfo = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const DrinkName = styled.h2`
  color: #6f4e37;
  margin: 0 0 10px 0;
  font-size: 22px;
`;

const DrinkPrice = styled.div`
  color: #4a8f3c;
  font-weight: bold;
  font-size: 20px;
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const PaymentButton = styled.button`
  background-color: ${props => props.primary ? '#6f4e37' : 'white'};
  color: ${props => props.primary ? 'white' : '#6f4e37'};
  border: 2px solid #6f4e37;
  border-radius: 8px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PaymentSelection = ({ drink, onSelect, onBack }) => {
  if (!drink) return null;
  
  return (
    <Container>
      <Header>Выберите способ оплаты</Header>
      
      <DrinkInfo>
        <DrinkName>{drink.name}</DrinkName>
        <DrinkPrice>К оплате: {drink.price} ₽</DrinkPrice>
      </DrinkInfo>
      
      <PaymentOptions>
        <PaymentButton primary onClick={() => onSelect('card')}>
          Оплата картой
        </PaymentButton>
        
        <PaymentButton onClick={() => onSelect('cash')}>
          Оплата наличными
        </PaymentButton>
      </PaymentOptions>
      
      <BackButton onClick={onBack}>
        Назад к выбору напитка
      </BackButton>
    </Container>
  );
};

export default PaymentSelection; 