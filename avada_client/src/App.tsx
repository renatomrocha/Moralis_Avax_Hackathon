import React from "react";
import "./App.css";
import Moralis from "moralis";
import Navbar from "./components/Navbar";
import { useMoralis } from "react-moralis";
import Tokens from "./components/Tokens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenView from "./components/TokenView";

function App() {
  Moralis.initialize("3zMC9oNElQZ4Ew0pzpmSwzve9r7JTj1tajiJwQx6");
  Moralis.serverURL = "https://1tm9bltzoknp.usemoralis.com:2053/server";

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
              <Route path="/dexes" element={<p>Placeholder4</p>} />
              <Route path="/dex/:dexId"  element={<p>Placeholder5</p>} />
              <Route path="/statistics"  element={<p>Placeholder6</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
