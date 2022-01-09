import {Avatar, Divider, Flex, Grid, GridItem, Heading, HStack, IconButton, Text} from "@chakra-ui/react";
import {FiMenu} from "react-icons/all";
import {useState} from "react";
import {NavItem} from "./NavItem";
import dashboard from '../../images/dashboard.png';
import tokens from '../../images/tokens.png';
import coins from '../../images/coins.png';
import pools from '../../images/pools.png';
import charts from '../../images/charts.png';

import {ColorPalette} from "../styles/color_palette";

export function Sidebar({navSize, setNavSize}:any) {



    // https://toppng.com/uploads/preview/dashboard-svg-icon-free-dashboard-icon-11553444664o1utwdkesz.png


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
              <HStack spacing='8px' margin={5}>
                  <Text display={ navSize=='large'?'flex':'none'} fontWeight={'bold'} fontSize='2xl' color="white">AVADA</Text>

                  <IconButton
                    aria-label='Search database'
                    background="none"
                    color="white"
                    // mt={5}
                    _hover={{background:"none"}}
                    icon={<FiMenu/>}
                    onClick={()=>{
                        navSize=='large'?setNavSize('small'):setNavSize('large')
                    }}
                />

              </HStack>

                <NavItem navSize={navSize} title="Dashboard" route="/" icon={charts}/>
                <NavItem navSize={navSize} title="Coins" route="/tokens" icon={tokens}/>
                <NavItem navSize={navSize} title="Multiple coins" route="/multiTokens" icon={coins}/>
                <NavItem navSize={navSize} title="Pools" route="/pools" icon={pools}/>

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