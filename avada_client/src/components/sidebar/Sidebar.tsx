import {Avatar, Divider, Flex, Grid, GridItem, Heading, IconButton, Text} from "@chakra-ui/react";
import {FiMenu} from "react-icons/all";
import {useState} from "react";
import {NavItem} from "./NavItem";
import dashboard from '../../images/dashboard.png';
import tokens from '../../images/tokens.png';
import coins from '../../images/coins.png';

import {ColorPalette} from "../styles/color_palette";

export function Sidebar({navSize, setNavSize}:any) {



    // https://toppng.com/uploads/preview/dashboard-svg-icon-free-dashboard-icon-11553444664o1utwdkesz.png

    const DashboardIcon = () => {
        return (<img style={{width:50, height:50}} src={dashboard}/>)
    }


    return(
        <Flex
            // pos="absolute"
            display="flex"
            h="100%"
            marginTop="0"
            // boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            borderRadius={navSize=='small'?"5px":"10px"}
            backgroundColor={ColorPalette.mainColor}
            w={navSize=='small'?"100px":"250px"}
            flexDir="column"
            justifyContent="space-between"
            zIndex={999}
        >

            <Flex
                // p="5%"
                flexDir="column"
                alignItems="flex-start"
                as="nav"
            >
                <Grid templateColumns='repeat(5, 1fr)' alignItems="center" style={{marginTop:20}}>
                    <GridItem colSpan={3}>
                <IconButton
                    aria-label='Search database'
                    background="none"
                    // mt={5}
                    _hover={{background:"none"}}
                    icon={<FiMenu/>}
                    onClick={()=>{
                        navSize=='large'?setNavSize('small'):setNavSize('large')
                    }}
                /></GridItem>
                    <GridItem colSpan={2} display={ navSize=='large'?'flex':'none'}>
                        <Text as={"h1"}>AVADA</Text>
                    </GridItem>
                </Grid>

                <NavItem navSize={navSize} title="Dashboard" route="/" icon={dashboard}/>
                <NavItem navSize={navSize} title="Single Coin" route="/tokens" icon={tokens}/>
                <NavItem navSize={navSize} title="Coins" route="/tokens" icon={coins}/>

            </Flex>


            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems="flex-start"
                mb={4}
            >
                <Divider display={navSize=='small'? "none":"flex"}/>
                <Flex mt={4} align="center">
                    <Avatar size="sm"/>
                    <Flex flexDir="column" ml={4} display={navSize=='small'? "none":"flex"}>
                        <Heading as="h3" size="sm">Renato</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>

            </Flex>

        </Flex>
    )

}