import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import HomePage from './comps/HomePage';
import ChatPage from './comps/ChatPage';
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;

