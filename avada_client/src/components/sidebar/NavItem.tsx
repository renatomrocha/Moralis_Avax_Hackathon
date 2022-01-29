import {Flex, Icon, Link, Menu, MenuButton, MenuList, Text} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom';
import dashboard from "../../images/dashboard.png";
import {NavHoverBox} from "./NavHoverBox";
import React, {useState} from "react";
import {ColorPalette} from "../styles/color_palette";
import {deletePopupMessage, renderPopupMessage} from "./PopupMessage";
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export function NavItem({navSize, icon, title, route, active, style,setActiveMenu, idx, status}:any) {

    const [hoverOject, setHoverObject] = useState<any>(null);
    const [popupTimerOn, setPopupTimerOn] = useState<boolean>(true);
    const [popupActivated, setPopupActivated] = useState(false);
    const [showInfo, setShowInfo] = useState<boolean>(false);



    // @ts-ignore
    // @ts-ignore
    return(
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize=="small"? "center" : "flex-start"}
            backgroundColor={style.backgroundColor}
            borderColor={style.borderColor}
            borderWidth={style.borderColor?1:0}
            borderRadius={8}
            opacity={status =='active'? 1: 0.2}
        >
            <Menu placement ="right">
                <Link
                    as={ReactLink}
                    to={route}
                    p={3}
                    borderRadius={8}
                    _hover={status == 'active' ? {backgroundColor:ColorPalette.highlight}:{backgroundColor:ColorPalette.mainColor}}
                    w={navSize == 'large'?'100%':''}
                    onClick={()=>{setActiveMenu(idx)}}

                >

                    <MenuButton w="100%" ml={3}>
                        <Flex style={{alignItems:'center'}}>
                            {/*<Icon as={icon} fontSize="xl" color={active ? '#FFB6C1' : "gray.500"}/>*/}
                            <img style={{width:40, height:40}} src={icon}/>
                            <Text color={ColorPalette.navFontColor} fontWeight={style.fontWeight} fontSize='xl' ml={5} display={navSize=='small'?'none':'flex'}>{title}</Text>
                        </Flex>
                    </MenuButton>


                </Link>

            </Menu>



        </Flex>
    )


}