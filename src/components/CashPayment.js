import React, { useEffect } from 'react';
import styled from 'styled-components';
import { emulator } from '../emulator';

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
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const DrinkName = styled.h2`
  color: #6f4e37;
  margin: 0 0 10px 0;
  font-size: 22px;
`;

const AmountDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const AmountLabel = styled.div`
  font-size: 18px;
  color: #666;
`;

const AmountValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.isEnough ? '#4a8f3c' : '#666'};
`;

const InstructionsPanel = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
`;

const InstructionsTitle = styled.h3`
  color: #6f4e37;
  margin: 0 0 10px 0;
  font-size: 18px;
`;

const InstructionsList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const InstructionItem = styled.li`
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
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

const CashPayment = ({ drink, amount, onAmountChange, onCancel }) => {
  useEffect(() => {
    // Start accepting cash when component mounts
    let totalAmount = 0;
    
    emulator.StartCashin((insertedValue) => {
      totalAmount += insertedValue;
      onAmountChange(totalAmount);
    });
    
    // Clean up when component unmounts
    return () => {
      emulator.StopCashin(() => {
        console.log('Cash input stopped');
      });
    };
  }, [onAmountChange]);
  
  if (!drink) return null;
  
  const isEnoughMoney = amount >= drink.price;
  const remainder = drink.price - amount;
  
  return (
    <Container>
      <Header>Оплата наличными</Header>
      
      <PaymentInfo>
        <DrinkName>{drink.name}</DrinkName>
        
        <AmountDisplay>
          <AmountLabel>Стоимость:</AmountLabel>
          <AmountValue>{drink.price} ₽</AmountValue>
        </AmountDisplay>
        
        <AmountDisplay>
          <AmountLabel>Внесено:</AmountLabel>
          <AmountValue>{amount} ₽</AmountValue>
        </AmountDisplay>
        
        {!isEnoughMoney && (
          <AmountDisplay>
            <AmountLabel>Осталось внести:</AmountLabel>
            <AmountValue>{remainder} ₽</AmountValue>
          </AmountDisplay>
        )}
        
        {isEnoughMoney && (
          <AmountDisplay>
            <AmountLabel>Сдача:</AmountLabel>
            <AmountValue isEnough={true}>{amount - drink.price} ₽</AmountValue>
          </AmountDisplay>
        )}
      </PaymentInfo>
      
      <InstructionsPanel>
        <InstructionsTitle>Инструкция:</InstructionsTitle>
        <InstructionsList>
          <InstructionItem>Нажмите клавишу "1" для внесения 10 ₽</InstructionItem>
          <InstructionItem>Нажмите клавишу "2" для внесения 50 ₽</InstructionItem>
          <InstructionItem>Нажмите клавишу "3" для внесения 100 ₽</InstructionItem>
          <InstructionItem>Нажмите клавишу "4" для внесения 500 ₽</InstructionItem>
          <InstructionItem>Нажмите клавишу "5" для внесения 1000 ₽</InstructionItem>
        </InstructionsList>
      </InstructionsPanel>
      
      <CancelButton onClick={onCancel}>
        Отменить оплату
      </CancelButton>
    </Container>
  );
};

export default CashPayment; 