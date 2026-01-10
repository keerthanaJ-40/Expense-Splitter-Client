import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Home Route */}
        <Route 
          path="/" 
          element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} 
        />

        {/* Add Expense Route - With check */}
        <Route 
          path="/add-expense" 
          element={isLoggedIn ? <AddExpense /> : <Navigate to="/" />} 
        />

        {/* Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} 
        />

        {/* Handle Capital Letter Errors (/AddExpense) */}
        <Route path="/AddExpense" element={<Navigate to="/add-expense" />} />

        {/* Catch-all: Edhavathu thappa type panna Home-ku redirect aagum */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;