import {Flex, Icon, Link, Menu, MenuButton, MenuList, Text} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom';
import dashboard from "../../images/dashboard.png";
import {NavHoverBox} from "./NavHoverBox";
import {useState} from "react";
import {ColorPalette} from "../styles/color_palette";


export function NavItem({navSize, icon, title, route, active, description}:any) {


    return(
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize=="small"? "center" : "flex-start"}
        >
            <Menu placement ="right">
                <Link
                    as={ReactLink}
                    to={route}
                    backgroundColor={active && '#FFB6C1'}
                    p={3}
                    borderRadius={8}
                    _hover={{textDecor:'none', backgroundColor:ColorPalette.secondaryColor}}
                    w={navSize == 'large'?'100%':''}
                >

                    <MenuButton w="100%">
                        <Flex style={{alignItems:'center'}}>
                            {/*<Icon as={icon} fontSize="xl" color={active ? '#FFB6C1' : "gray.500"}/>*/}
                            <img style={{width:60, height:60}} src={icon}/>
                            <Text color='white' fontSize='xl' ml={5} display={navSize=='small'?'none':'flex'}>{title}</Text>
                        </Flex>
                    </MenuButton>

                </Link>

            </Menu>

        </Flex>
    )


}