import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {MoralisProvider} from "react-moralis";
import WithSubnavigation from "./components/Navbar";


const theme = extendTheme({
    'config': {
        initialColorMode:'light'
    }
});

const appId = "3zMC9oNElQZ4Ew0pzpmSwzve9r7JTj1tajiJwQx6";
const serverUrl = "https://1tm9bltzoknp.usemoralis.com:2053/server";


ReactDOM.render(
  <React.StrictMode>
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
      </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
