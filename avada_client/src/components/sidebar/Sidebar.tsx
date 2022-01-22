import {Avatar, Divider, Flex, Grid, GridItem, Heading, HStack, IconButton, Text} from "@chakra-ui/react";
import {FiMenu} from "react-icons/all";
import {useEffect, useState} from "react";
import {NavItem} from "./NavItem";
import dashboard from '../../images/dashboard.png';
import tokens from '../../images/tokens.png';
import coins from '../../images/coins.png';
import pools from '../../images/pools.png';
import charts from '../../images/charts.png';
import whales from '../../images/whales.png';
import mempools from '../../images/mempools.png';
import bridges from '../../images/bridges.png';

import {ColorPalette} from "../styles/color_palette";


const Menus = [
    {title:"Dashboard" ,route:"/", icon:charts, status: 'active'},
    {title:"Tokens" ,route:"/tokens", icon:tokens, status: 'active'},
    {title:"Multiple Tokens" ,route:"/multiTokens", icon:coins, status: 'active'},
    {title:"Pools" ,route:"/pools", icon:pools, status: 'active'},
    {title:"Whales", route:"/whales", icon:whales, status: 'inactive'},
    {title:"MemPools", route:"/mempools", icon:mempools, status: 'inactive'},
    {title:"bridges", route:"/bridges", icon:bridges, status: 'inactive'},


]


export function Sidebar({navSize, setNavSize}:any) {

    const [activeMenu, setActiveMenu] = useState(0);


    useEffect(()=>{
        console.log("Active menu is: ", activeMenu);
    }, [activeMenu])


    return(
        <Flex
            // pos="absolute"
            display="flex"
            h="100%"
            marginTop="0"
            // boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            borderRadius={navSize=='small'?"0px 5px 5px 0px":"0px 5px 5px 0px"}
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
                  <Text display={ navSize=='large'?'flex':'none'} fontWeight={'bold'} fontSize='2xl' color={ColorPalette.navFontColor} ml={10} mt={5}>AVALYTICS</Text>

                {/*  <IconButton*/}
                {/*    aria-label='Search database'*/}
                {/*    background="none"*/}
                {/*    color="white"*/}
                {/*    // mt={5}*/}
                {/*    _hover={{background:"none"}}*/}
                {/*    icon={<FiMenu/>}*/}
                {/*    onClick={()=>{*/}
                {/*        navSize=='large'?setNavSize('small'):setNavSize('large')*/}
                {/*    }}*/}
                {/*/>*/}

              </HStack>

                {Menus.map((m:any, idx: number) => {
                    return(<NavItem idx={idx} style={activeMenu==idx?{borderColor:ColorPalette.red, borderStyle:'solid', borderWidth:1, borderRadius: 5}:{}}
                                    setActiveMenu={setActiveMenu}
                                    navSize={navSize}
                                    title={m.title}
                                    route={m.route}
                                    icon={m.icon}
                                    status = {m.status}/>)
                })}
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