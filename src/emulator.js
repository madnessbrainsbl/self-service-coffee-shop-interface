// Emulator for coffee machine hardware
export const emulator = {
  StartCashin: function (cb) {
    // Start accepting bills/coins
    console.log('Cash input activated');
    
    // Set up keyboard shortcut for cash input
    // For emulation, we'll use "1", "5", "10", "50", "100" keys for common denominations
    const handleKeyDown = (event) => {
      if (event.key === '1') {
        console.log('Inserting 10 rubles');
        cb(10);
      } else if (event.key === '2') {
        console.log('Inserting 50 rubles');
        cb(50);
      } else if (event.key === '3') {
        console.log('Inserting 100 rubles');
        cb(100);
      } else if (event.key === '4') {
        console.log('Inserting 500 rubles');
        cb(500);
      } else if (event.key === '5') {
        console.log('Inserting 1000 rubles');
        cb(1000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Store the handler to remove it later
    this._cashKeyHandler = handleKeyDown;
  },
  
  StopCashin: function (cb) {
    // Stop accepting bills/coins
    console.log('Cash input deactivated');
    
    // Remove the keyboard event listener
    if (this._cashKeyHandler) {
      window.removeEventListener('keydown', this._cashKeyHandler);
      this._cashKeyHandler = null;
    }
    
    if (cb) cb();
  },
  
  BankCardPurchase: function (amount, cb, display_cb) {
    // Start card payment process
    console.log(`Starting card payment for ${amount} rubles`);
    
    // Set up keyboard shortcuts for card payment
    const handleKeyDown = (event) => {
      if (event.key === 'y' || event.key === 'Y') {
        console.log('Card payment successful');
        clearTimeout(this._displayTimeout);
        
        display_cb('Оплата прошла успешно');
        setTimeout(() => {
          cb(true);
        }, 1000);
        
        window.removeEventListener('keydown', handleKeyDown);
      } else if (event.key === 'n' || event.key === 'N') {
        console.log('Card payment failed');
        clearTimeout(this._displayTimeout);
        
        display_cb('Ошибка оплаты');
        setTimeout(() => {
          cb(false);
        }, 1000);
        
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Simulate pin-pad messages
    display_cb('Приложите карту');
    
    this._displayTimeout = setTimeout(() => {
      display_cb('Обработка карты');
      
      this._displayTimeout = setTimeout(() => {
        display_cb('Связь с банком');
        
        this._displayTimeout = setTimeout(() => {
          display_cb('Проверка средств');
          
          this._displayTimeout = setTimeout(() => {
            display_cb('Нажмите Y для успешной оплаты или N для отказа');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
    
    // Store handler for removal
    this._cardKeyHandler = handleKeyDown;
  },
  
  BankCardCancel: function () {
    // Cancel card payment
    console.log('Card payment canceled');
    
    // Remove keyboard listener
    if (this._cardKeyHandler) {
      window.removeEventListener('keydown', this._cardKeyHandler);
      this._cardKeyHandler = null;
    }
    
    // Clear any pending timeouts
    if (this._displayTimeout) {
      clearTimeout(this._displayTimeout);
    }
  },
  
  Vend: function (product_idx, cb) {
    // Dispense coffee
    console.log(`Dispensing coffee with index ${product_idx}`);
    
    // Set up keyboard shortcuts for successful/failed dispensing
    const handleKeyDown = (event) => {
      if (event.key === 'v' || event.key === 'V') {
        console.log('Coffee dispensed successfully');
        cb(true);
        window.removeEventListener('keydown', handleKeyDown);
      } else if (event.key === 'f' || event.key === 'F') {
        console.log('Coffee dispensing failed');
        cb(false);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Alert user about keyboard shortcuts
    alert('Нажмите V для успешного приготовления или F для ошибки');
  }
}; 