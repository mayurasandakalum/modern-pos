import React, { useState } from 'react';
import POSPage from './pages/POSPage';
import InventoryPage from './pages/InventoryPage';

function App() {
  const [currentPage, setCurrentPage] = useState('pos');

  return (
    <>
      {currentPage === 'pos' && <POSPage currentPage={currentPage} onNavigate={setCurrentPage} />}
      {currentPage === 'inventory' && <InventoryPage currentPage={currentPage} onNavigate={setCurrentPage} />}
    </>
  );
}

export default App;
