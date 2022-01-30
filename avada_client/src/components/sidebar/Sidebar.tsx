import {Avatar, Divider, Flex, Grid, GridItem, Heading, HStack, IconButton, Text} from "@chakra-ui/react";
import {FiMenu} from "react-icons/all";
import React, {useEffect, useState} from "react";
import {NavItem} from "./NavItem";
import dashboard from '../../images/dashboard.png';
import tokens from '../../images/tokens.png';
import coins from '../../images/coins.png';
import pools from '../../images/pools.png';
import charts from '../../images/charts.png';
import whales from '../../images/whales.png';
import mempools from '../../images/mempools.png';
import bridges from '../../images/bridges.png';
import logo_1 from '../../images/logo_1.png';
import logo_2 from '../../images/logo_2.png';
import logo from '../../images/logo.png';
import {ColorPalette} from "../styles/color_palette";


const Menus = [
    {title:"Dashboard" ,route:"/", icon:charts, status: 'active'},
    {title:"Tokens" ,route:"/tokens", icon:tokens, status: 'active'},
    {title:"Multiple Tokens" ,route:"/multiTokens", icon:coins, status: 'active'},
    {title:"Pools" ,route:"/pools", icon:pools, status: 'active'},
    {title:"Whales", route:"/whales", icon:whales, status: 'inactive'},
    {title:"MemPools", route:"/mempools", icon:mempools, status: 'inactive'},
    {title:"Bridges", route:"/bridges", icon:bridges, status: 'inactive'},
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
                  {/*<Text display={ navSize=='large'?'flex':'none'} fontWeight={'bold'} fontSize='2xl' color={ColorPalette.navFontColor} ml={10} mt={5}>AVALYTICS</Text>*/}
                  <div style={{paddingTop:20}} >
                      <img width={60} height={60} src={logo}/>
                  </div>
                  <div style={{width:220, height:60, paddingTop:20, paddingRight:20}} >
                    <img src={logo_2}/>
                  </div>
              </HStack>

                {Menus.map((m:any, idx: number) => {
                    return(<NavItem idx={idx} style={activeMenu==idx?{fontWeight:'900', backgroundColor:ColorPalette.secondaryColor}:{}}
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
                    <Flex flexDir="column" ml={4} display={navSize=='small'? "none":"flex"}>
                        <Text color="gray" cursor={'pointer'} onClick={()=>console.log("Team...")}>Team</Text>
                    </Flex>
                </Flex>

            </Flex>

        </Flex>
    )

}