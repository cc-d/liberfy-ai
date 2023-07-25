import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import { AuthProvider } from './AuthContext';
import NavBar  from './components/NavBar';
import ChatPage from './components/ChatPage';
import ChatListPage from './components/ChatListPage';

function App() {
  return (
    <Router>
    <AuthProvider>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chats" element={<ChatListPage />} />
        </Routes>

        </AuthProvider>
    </Router>
  );
}

export default App;
