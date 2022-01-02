import React from "react";
import "./App.css";
import Moralis from "moralis";
import Navbar from "./components/Navbar";
import { useMoralis } from "react-moralis";
import Tokens from "./components/Tokens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenView from "./components/TokenView";
import CandleStickTemplate from "./components/charts/candlestick/CandleStickTemplate";
import {appId, serverUrl} from "./index";
import Pools from "./components/Pools";





function App() {
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;

  const { authenticate, isAuthenticating, isAuthenticated, logout, authError } =
    useMoralis();

  const authVars = {authenticate, isAuthenticating, isAuthenticated, logout, authError}

  // const [welcomeMessage, setWelcomeMessage] = useState("");

  // const [dexList, setDexList] = useState<any[]>([]);

  return (
    <div>
      <BrowserRouter>
        <Navbar authVars={authVars}/>
        <Routes>
              <Route path="/" element={<p>Placeholder1</p>} />
              <Route path="/exploreAvalanche" element={<p>Placeholder2</p>} />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/token/:address" element={<TokenView/>} />
              <Route path="/pools" element={<Pools />} />
              <Route path="/pool/:token0/:token1"  element={<p>Placeholder5</p>} />
            <Route path="/statistics"  element={<CandleStickTemplate />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
