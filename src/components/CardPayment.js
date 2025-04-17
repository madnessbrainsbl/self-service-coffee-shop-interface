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

const PaymentInfo = styled.div`
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
  font-size: 18px;
  font-weight: bold;
  color: #4a8f3c;
  margin-bottom: 20px;
`;

const PinpadDisplay = styled.div`
  background-color: #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PinpadMessage = styled.p`
  font-size: 20px;
  color: #333;
  margin: 10px 0;
`;

const Instructions = styled.p`
  color: #666;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`;

const CancelButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const CardPayment = ({ drink, message, onCancel }) => {
  if (!drink) return null;
  
  return (
    <Container>
      <Header>Оплата картой</Header>
      
      <PaymentInfo>
        <DrinkName>{drink.name}</DrinkName>
        <DrinkPrice>К оплате: {drink.price} ₽</DrinkPrice>
      </PaymentInfo>
      
      <PinpadDisplay>
        <PinpadMessage>{message || 'Ожидание...'}</PinpadMessage>
        
        {message && message.includes('Y') && (
          <Instructions>
            Нажмите Y для подтверждения или N для отмены
          </Instructions>
        )}
      </PinpadDisplay>
      
      <CancelButton onClick={onCancel}>
        Отменить оплату
      </CancelButton>
    </Container>
  );
};

export default CardPayment; 