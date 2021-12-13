import React from 'react';
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


function App() {
    const {authenticate, isAuthenticating,isAuthenticated,logout, authError} = useMoralis();

    if(isAuthenticated) {
        return (
            <Container>
                <Heading>AVADA</Heading>
                <ExampleChart/>
                <Button onClick={()=> logout()}>Logout</Button>
            </Container>
        )
    }



  return (
    <Container>
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
            <Button isLoading={isAuthenticating} onClick={()=> authenticate()}>Authenticate</Button>

    </Container>
  );
}

export default App;
