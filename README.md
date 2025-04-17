# Coffee Shop Self-Service Interface

## Overview
This is a web-based self-service interface for a coffee shop, designed as a minimalist simulation of a coffee machine kiosk.

## Features
1. **Drink Selection Screen** - Displays available coffee drinks with descriptions and prices
2. **Payment Selection Screen** - Allows customers to choose between cash or card payment
3. **Cash Payment Screen** - Simulates cash payment with an emulator
4. **Card Payment Screen** - Simulates card payment with PIN-pad emulator messages
5. **Preparation Screen** - Shows preparation status with visual elements

## Key Controls (Emulator)
- **Cash Payment**:
  - Press "1" to insert 10₽
  - Press "2" to insert 50₽ 
  - Press "3" to insert 100₽
  - Press "4" to insert 500₽
  - Press "5" to insert 1000₽

- **Card Payment**:
  - Press "Y" for successful payment
  - Press "N" for failed payment

- **Coffee Preparation**:
  - Press "V" for successful coffee dispensing
  - Press "F" for failed coffee dispensing

## Technical Details
- Built with React.js
- Styled with styled-components
- Fixed-width design optimized for Google Chrome
- Includes a hardware emulator module for simulating real device interactions

## Running the Project
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to launch the development server
4. Open [http://localhost:3000](http://localhost:3000) in Google Chrome

## Emulator Implementation
The application includes a JavaScript emulator that simulates hardware interactions:
- Cash acceptor
- Card payment terminal
- Coffee dispensing system

These interactions are triggered through keyboard shortcuts for demonstration purposes.
