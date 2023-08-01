import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import { AuthProvider } from './AuthContext';
import NavBar  from './components/NavBar';
import ChatPage from './components/ChatPage';
import ChatListPage from './components/ChatListPage';
import CompletionPage from './components/CompletionPage';
import ChatProvider from './components/ChatPage/ChatContext';

function App() {
  return (
    <Router>
    <AuthProvider>

    <ChatProvider>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
            <Route path="/chats" element={<ChatListPage />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
            <Route path="/completion/:completionId" element={<CompletionPage/>} />

        </Routes>
        </ChatProvider>
        </AuthProvider>
    </Router>
  );
}

export default App;
