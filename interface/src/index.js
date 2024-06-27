// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { Web3Provider } from './Web3Context';
import './index.css'; // Import global styles

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Web3Provider>
        <Router>
          <App />
        </Router>
      </Web3Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
