import {Flex, Icon, Link, Menu, MenuButton, MenuList, Text} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom';
import dashboard from "../../images/dashboard.png";
import {NavHoverBox} from "./NavHoverBox";
import React, {useState} from "react";
import {ColorPalette} from "../styles/color_palette";
import {deletePopupMessage, renderPopupMessage} from "./PopupMessage";
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export function NavItem({navSize, icon, title, route, active, description}:any) {

    const [hoverOject, setHoverObject] = useState<any>(null);
    const [popupTimerOn, setPopupTimerOn] = useState<boolean>(true);
    const [popupActivated, setPopupActivated] = useState(false);
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const activatePopupTimer = () => {
        setPopupActivated(true);
    }


    const handleMouseEnter = (e:any) => {
        console.log("Entered with event: ", e.target);
        setShowInfo(true)
        // // setPopupActivated(true);
        // // // console.log("Handling mouse enter...");
        // // setPopupTimerOn(true);
        //
        // // setTimeout(()=> {
        //     console.log("Entered timeout with popuptimer: ", popupTimerOn);
        //
        //     console.log("Activated!!")
        //     setPopupActivated(true);

        // }, 1000)
    }
    //
    const handleMouseLeave = () => {
        setShowInfo(false);
        // setPopupActivated(false);
        // console.log("Setting false");
        // setPopupTimerOn(false);
        // setPopupActivated(false);
    }

    const handleInfoHover = () => {
        setPopupActivated(true);
    }

    const handleInfoOut = () => {
        setPopupActivated(false);

    }



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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    w={navSize == 'large'?'100%':''}
                >

                    <MenuButton w="100%">
                        <Flex style={{alignItems:'center'}}>
                            {/*<Icon as={icon} fontSize="xl" color={active ? '#FFB6C1' : "gray.500"}/>*/}
                            <img style={{width:60, height:60}} src={icon}/>
                            <Text color='white' fontSize='xl' ml={5} display={navSize=='small'?'none':'flex'}>{title}</Text>
                        </Flex>
                    </MenuButton>
                    {showInfo && (<div onMouseEnter={handleInfoHover} onMouseLeave={handleInfoOut} style={{padding:6, float:'right'}}><FontAwesomeIcon icon={faInfoCircle}  style={{float:'right',color:'white'}}/></div> )}


                </Link>

            </Menu>
            {popupActivated && (<div style={{position:'absolute', left:navSize=='small'?"80px":"230px"
                ,backgroundColor:ColorPalette.mainColor, opacity:0.95, zIndex:999,borderColor:'gray', borderWidth:1,
                borderRadius:10, width:200, height: 200, padding:20}}>Hey</div>)}


        </Flex>
    )


}