import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import {TitleText, AuthButton, NavbarItem, items, AuthError} from "./NavbarComponents";

function Navbar(props: any) {

    return (
        <div>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <TitleText/>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <Stack direction={'row'} spacing={4}>
                            {items.map((navItem: any, i: any) => (
                            <NavbarItem key={i} item={navItem} />
                            ))}
                        </Stack>
                    </Flex>
                </Flex>
                <AuthButton setUser={props.setUser} authVars={props.authVars} />
            </Flex>
            {!props.authVars.isAuthenticated &&
            <AuthError authError={props.authVars.authError}/>}
        </div>

    )
}

export default Navbar;


