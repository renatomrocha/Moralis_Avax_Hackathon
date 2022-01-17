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
    useDisclosure, Flex
} from "@chakra-ui/react";
import {MultipleTokens} from "./components/MultipleTokens";
import PoolView from "./components/PoolView";





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
    <Flex>

        <BrowserRouter >

          <Grid h="95vh" w='99vw' templateColumns='repeat(10, 1fr)'>



                <GridItem clsSpan={2} style={{height:"100vh"}}>
                  <Sidebar navSize={navSize} setNavSize={setNavSize}/>
                </GridItem>

                <GridItem colSpan={9} style={{marginLeft:20, width:'100%',overflow:'auto'}}>
                      <Routes>
                      <Route path="/" element={<Dashboard/>} />
                      <Route path="/tokens" element={<Tokens/>} />
                      <Route path="/multiTokens" element={<MultipleTokens />} />
                      <Route path="/token/:address" element={<TokenView/>} />

                      <Route path="/pools" element={<Pools />} />
                      <Route path="/pool/:token0/:token1"  element={<PoolView/>} />
                    <Route path="/statistics"  element={<CandleStickTemplate />} />

                    </Routes>
                </GridItem>
          </Grid>
          {/*</div>*/}
      </BrowserRouter>
    </Flex>
  )
  
}

export default App;
