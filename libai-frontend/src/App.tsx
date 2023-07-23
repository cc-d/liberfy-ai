import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/AuthForm';

import Home from './components/Home';
import { AuthProvider } from './AuthContext';
import NavBar  from './components/NavBar';

function App() {
  return (
    <Router>
    <AuthProvider>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

        </AuthProvider>
    </Router>
  );
}

export default App;
