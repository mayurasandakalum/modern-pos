import React, { useState } from 'react';
import POSPage from './pages/POSPage';
import InventoryPage from './pages/InventoryPage';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [currentPage, setCurrentPage] = useState('pos');

  return (
    <LanguageProvider>
      {currentPage === 'pos' && <POSPage currentPage={currentPage} onNavigate={setCurrentPage} />}
      {currentPage === 'inventory' && <InventoryPage currentPage={currentPage} onNavigate={setCurrentPage} />}
    </LanguageProvider>
  );
}

export default App;
