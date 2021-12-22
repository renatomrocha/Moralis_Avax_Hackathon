import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import TokenView from "./components/TokenView";
import WithSubnavigation from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tokens from "./components/Tokens";



function App() {
  Moralis.initialize("3zMC9oNElQZ4Ew0pzpmSwzve9r7JTj1tajiJwQx6");
  Moralis.serverURL = "https://1tm9bltzoknp.usemoralis.com:2053/server";

  const { authenticate, isAuthenticating, isAuthenticated, logout, authError } =
    useMoralis();

  const [welcomeMessage, setWelcomeMessage] = useState("");

  const [dexList, setDexList] = useState<any[]>([]);


  if (isAuthenticated) {
    //
    // (async () => {
    //     const welcomeMessage = await Moralis.Cloud.run("welcomeFunction",{});
    //     setWelcomeMessage(welcomeMessage);
    // })();



    return (
      <div>
        <BrowserRouter>
          <WithSubnavigation
            authenticationFunction={authenticate}
            isAuthenticated={isAuthenticated}
            logout={logout}
            isAuthenticating={isAuthenticating}
          />
          <div style={{ margin: "20px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Heading>{welcomeMessage}</Heading>
                  </div>
                }
              />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/tokens/:address" element={<TokenView />} />

              <Route
                path="/dex/:dexId"
                element={
                  <div>
                    <h2>DEX</h2>
                  </div>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
        {/*<Button  onClick={()=> getDexes()}>Get DEXs</Button>*/}
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <WithSubnavigation
          authenticationFunction={authenticate}
          isAuthenticated={isAuthenticated}
          logout={logout}
          isAuthenticating={isAuthenticating}
        ></WithSubnavigation>
      </BrowserRouter>

      <div style={{ margin: "20px" }}>
        {authError && (
          <Alert status="error">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Authentication has failed</AlertTitle>
              <AlertDescription display="block">
                {authError.message}
              </AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
              ></CloseButton>
            </Box>
          </Alert>
        )}

        <Heading>AVADA</Heading>
      </div>
    </div>
  );
}

export default App;
