import React, {useEffect, useState} from "react";
import "./App.css";
import Moralis from "moralis";
import Navbar from "./components/navbar/Navbar";
import { useMoralis } from "react-moralis";
import Tokens from "./components/Tokens";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenView from "./components/TokenView";
import CandleStickTemplate from "./components/charts/candlestick/CandleStickTemplate";
import {appId, serverUrl} from "./index";
import Pools from "./components/Pools";
import {Dashboard} from "./components/dashboard/Dashboard";
import set = Moralis.CoreManager.set;
import {Sidebar} from "./components/sidebar/Sidebar";
import {
    Button, DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Grid, Drawer,
    GridItem, Input,
    useDisclosure
} from "@chakra-ui/react";
import {MultipleTokens} from "./components/MultipleTokens";





function App() {
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;

  const { authenticate, isAuthenticating, isAuthenticated, logout, authError } =
    useMoralis();

  const authVars = {authenticate, isAuthenticating, isAuthenticated, logout, authError}
    const [user,setUser] = useState();
    const [navSize, setNavSize] = useState('large');

  useEffect(()=>console.log("User now is: ", user),[user])

  // const [welcomeMessage, setWelcomeMessage] = useState("");

  // const [dexList, setDexList] = useState<any[]>([]);

  return (
    <div>

        <BrowserRouter>
        {/*<Navbar user={user} setUser={setUser} authVars={authVars}/>*/}
          <Grid h="100vh" templateColumns='repeat(10, 1fr)'>

              {/*To make screen movable with sidenav opening and closing (remove colSpans)*/}
              {/*<GridItem sytle={{position:"absolute"}} >*/}

              <GridItem clsSpan={2}>
              <Sidebar navSize={navSize} setNavSize={setNavSize}/>
        </GridItem>
            {/*<div style={{marginLeft:navSize=='large'?'250px':'100px', height:"1vh"}}>*/}
          <GridItem colSpan={7} style={{marginLeft:20}}>
              <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/exploreAvalanche" element={<Dashboard/>} />
              <Route path="/tokens" element={<Tokens />} />
                  <Route path="/multiTokens" element={<MultipleTokens/>} />
              <Route path="/token/:address" element={<TokenView/>} />

              <Route path="/pools" element={<Pools />} />
              <Route path="/pool/:token0/:token1"  element={<p>Placeholder5</p>} />
            <Route path="/statistics"  element={<CandleStickTemplate />} />

                </Routes>
          </GridItem>
          </Grid>
          {/*</div>*/}
      </BrowserRouter>
    </div>
  )
  
}

export default App;
