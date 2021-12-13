import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    CloseButton,
    Container,
    Heading
} from "@chakra-ui/react";
import {useMoralis} from "react-moralis";
import Moralis from "moralis";
import ExampleChart from "./components/exampleChart";
import WithSubnavigation from "./components/Navbar";


function App() {
    const {authenticate, isAuthenticating,isAuthenticated,logout, authError} = useMoralis();

    const [welcomeMessage, setWelcomeMessage] = useState("");



    if(isAuthenticated) {

        (async () => {
            const welcomeMessage = await Moralis.Cloud.run("welcomeFunction",{});
            setWelcomeMessage(welcomeMessage);
        })();

        return (
            <div>
            <WithSubnavigation authenticationFunction={authenticate} isAuthenticated={isAuthenticated} logout={logout} isAuthenticating={isAuthenticating}></WithSubnavigation>
                <div style={{margin:"20px"}}>
                <Heading>{welcomeMessage}</Heading>
                    <ExampleChart/>
                </div>
                    {/*<Button onClick={()=> logout()}>Logout</Button>*/}
            </div>
        )
    }



  return (
    <div>
        <WithSubnavigation authenticationFunction={authenticate} isAuthenticated={isAuthenticated} logout={logout} isAuthenticating={isAuthenticating}></WithSubnavigation>
        <div style={{margin:"20px"}}>

        {authError && (<Alert status="error">
            <AlertIcon/>
            <Box flex="1">
                <AlertTitle>Authentication has failed</AlertTitle>
                <AlertDescription display="block">
                    {authError.message}
                </AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px"></CloseButton>
            </Box>
        </Alert>)}

            <Heading>AVADA</Heading>
            {/*<Button isLoading={isAuthenticating} onClick={()=> authenticate()}>Authenticate</Button>*/}
            </div>
    </div>
  );
}

export default App;
