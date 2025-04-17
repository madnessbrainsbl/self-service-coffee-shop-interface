import React, { useState } from 'react';
import styled from 'styled-components';
import DrinkSelection from './components/DrinkSelection';
import PaymentSelection from './components/PaymentSelection';
import CashPayment from './components/CashPayment';
import CardPayment from './components/CardPayment';
import PreparationScreen from './components/PreparationScreen';
import { emulator } from './emulator';
import './App.css';

// Screens enum
const SCREENS = {
  DRINK_SELECTION: 'DRINK_SELECTION',
  PAYMENT_SELECTION: 'PAYMENT_SELECTION',
  CASH_PAYMENT: 'CASH_PAYMENT',
  CARD_PAYMENT: 'CARD_PAYMENT',
  PREPARATION: 'PREPARATION',
  COMPLETION: 'COMPLETION'
};

// Coffee drinks data
const DRINKS = [
  { id: 0, name: 'Эспрессо', description: 'Классический крепкий кофе', price: 150 },
  { id: 1, name: 'Американо', description: 'Эспрессо с добавлением горячей воды', price: 180 },
  { id: 2, name: 'Капучино', description: 'Эспрессо с добавлением взбитого молока', price: 220 },
  { id: 3, name: 'Латте', description: 'Эспрессо с большим количеством молока', price: 240 },
  { id: 4, name: 'Флэт Уайт', description: 'Двойной эспрессо с молоком', price: 250 },
];

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background-color: #f9f4ef;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.DRINK_SELECTION);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [amount, setAmount] = useState(0);
  const [pinpadMessage, setPinpadMessage] = useState('');
  const [preparationStatus, setPreparationStatus] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);
    setCurrentScreen(SCREENS.PAYMENT_SELECTION);
  };

  const handlePaymentSelect = (method) => {
    if (method === 'cash') {
      setCurrentScreen(SCREENS.CASH_PAYMENT);
    } else {
      setCurrentScreen(SCREENS.CARD_PAYMENT);
      handleCardPayment();
    }
  };

  const handleCashInsert = (insertedAmount) => {
    setAmount(insertedAmount);
    
    if (insertedAmount >= selectedDrink.price) {
      // Stop cash in when enough money is inserted
      emulator.StopCashin(() => {});
      
      // Move to preparation screen after a short delay
      setTimeout(() => {
        setCurrentScreen(SCREENS.PREPARATION);
        handlePreparation();
      }, 1500);
    }
  };

  const handleCardPayment = () => {
    emulator.BankCardPurchase(
      selectedDrink.price,
      (result) => {
        if (result) {
          setCurrentScreen(SCREENS.PREPARATION);
          handlePreparation();
        } else {
          setPinpadMessage('Ошибка оплаты');
          setTimeout(() => {
            setCurrentScreen(SCREENS.PAYMENT_SELECTION);
          }, 2000);
        }
      },
      (message) => {
        setPinpadMessage(message);
      }
    );
  };

  const handlePreparation = () => {
    setPreparationStatus('Готовим ваш напиток...');
    
    emulator.Vend(selectedDrink.id, (result) => {
      if (result) {
        setPreparationStatus('Напиток готов! Приятного аппетита!');
        setIsCompleted(true);
      } else {
        setPreparationStatus('Ошибка приготовления. Пожалуйста, обратитесь к администратору.');
      }
      
      // Return to drink selection after a delay
      setTimeout(() => {
        resetApp();
      }, 5000);
    });
  };

  const resetApp = () => {
    setCurrentScreen(SCREENS.DRINK_SELECTION);
    setSelectedDrink(null);
    setAmount(0);
    setPinpadMessage('');
    setPreparationStatus('');
    setIsCompleted(false);
  };

  return (
    <AppContainer>
      {currentScreen === SCREENS.DRINK_SELECTION && (
        <DrinkSelection drinks={DRINKS} onSelect={handleDrinkSelect} />
      )}
      
      {currentScreen === SCREENS.PAYMENT_SELECTION && (
        <PaymentSelection 
          drink={selectedDrink} 
          onSelect={handlePaymentSelect} 
          onBack={() => setCurrentScreen(SCREENS.DRINK_SELECTION)} 
        />
      )}
      
      {currentScreen === SCREENS.CASH_PAYMENT && (
        <CashPayment 
          drink={selectedDrink} 
          amount={amount} 
          onAmountChange={handleCashInsert}
          onCancel={() => {
            emulator.StopCashin(() => {});
            setCurrentScreen(SCREENS.PAYMENT_SELECTION);
          }} 
        />
      )}
      
      {currentScreen === SCREENS.CARD_PAYMENT && (
        <CardPayment 
          drink={selectedDrink} 
          message={pinpadMessage}
          onCancel={() => {
            emulator.BankCardCancel();
            setCurrentScreen(SCREENS.PAYMENT_SELECTION);
          }} 
        />
      )}
      
      {currentScreen === SCREENS.PREPARATION && (
        <PreparationScreen 
          drink={selectedDrink} 
          status={preparationStatus}
          isCompleted={isCompleted}
        />
      )}
    </AppContainer>
  );
}

export default App;
