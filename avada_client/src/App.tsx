import React, {useEffect, useState} from "react";
import "./App.css";
import Moralis from "moralis";
import {useMoralis} from "react-moralis";
import Tokens from "./components/Tokens";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TokenView from "./components/TokenView";
import CandleStickTemplate from "./components/charts/candlestick/CandleStickTemplate";
import {appId, serverUrl} from "./index";
import {Dashboard} from "./components/dashboard/Dashboard";
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
import {ColorPalette} from "./components/styles/color_palette";
import UnderConstruction from "./components/genericComponents/UnderConstruction";
import whales_bl from './images/whales_bl.png';
import mempools_bl from './images/mempools_bl.png';
import bridges_bl from './images/bridges_bl.png';

function App() {
    Moralis.initialize(appId);
    Moralis.serverURL = serverUrl;

    const {authenticate, isAuthenticating, isAuthenticated, logout, authError} =
        useMoralis();

    const authVars = {authenticate, isAuthenticating, isAuthenticated, logout, authError}
    const [user, setUser] = useState();
    const [navSize, setNavSize] = useState('large');

    useEffect(() => console.log("User now is: ", user), [user])

    // const [welcomeMessage, setWelcomeMessage] = useState("");

    // const [dexList, setDexList] = useState<any[]>([]);

    return (
        <Flex style={{backgroundColor: ColorPalette.backgroundColor, height: '100vh', fontStyle: 'nunito'}}>

            <BrowserRouter>

                <Grid h="95vh" w='99vw' templateColumns='repeat(10, 1fr)'>


                    <GridItem clsSpan={2} style={{height: "100vh"}}>
                        <Sidebar navSize={navSize} setNavSize={setNavSize}/>
                    </GridItem>

                    <GridItem colSpan={9} style={{marginLeft: 20, width: '100%', overflow: 'auto'}}>
                        <Routes>
                            <Route path="/" element={<Dashboard style={{marginLeft: 30}}/>}/>
                            <Route path="/tokens" element={<Tokens style={{marginLeft: 30}}/>}/>
                            <Route path="/multiTokens" element={<MultipleTokens style={{marginLeft: 30}}/>}/>
                            <Route path="/token/:address" element={<TokenView style={{marginLeft: 30}}/>}/>

                            <Route path="/pools" element={<PoolView style={{marginLeft: 30}} />}/>
                            <Route path="/whales" element={<UnderConstruction icon={whales_bl} name={'Whales'}/>}/>
                            <Route path="/memPools" element={<UnderConstruction icon={mempools_bl} name={'MemPools'}/>}/>
                            <Route path="/bridges" element={<UnderConstruction icon={bridges_bl} name={'Bridges'}/>}/>
                            <Route path="/statistics" element={<CandleStickTemplate/>}/>

                        </Routes>
                    </GridItem>
                </Grid>
                {/*</div>*/}
            </BrowserRouter>
        </Flex>
    )

}

export default App;
