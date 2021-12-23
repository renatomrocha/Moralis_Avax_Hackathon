import {
    Box,
    Heading,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Button,
    Link,
    Popover,
    PopoverTrigger,
    useColorModeValue,
    useBreakpointValue
} from '@chakra-ui/react';
import {Link as ReactLink} from 'react-router-dom';

export const TitleText = () => {
    return (

        <Link
            as={ReactLink}
            to={"/"}
            _hover={{textDecoration: 'none'}}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            AVADA
        </Link> 
    )
}

export const items = [
        {
            label: 'AVAX',
            route: "/exploreAvalanche",
        //     children: [
        //         {
        //             label: 'Explore Design Work',
        //             subLabel: 'Trending Design to inspire you',
        //             href: '#',
        //         },
        //         {
        //             label: 'New & Noteworthy',
        //             subLabel: 'Up-and-coming Designers',
        //             href: '#',
        //         },
        //     ],
        },
        {
            label: 'Tokens',
            route: '/tokens',
        },
        {
            label: 'DEXs',
            route: "/dexes",
        },
        {
            label: 'Statistics',
            route: "/statistics"
        },
    ];


export const NavbarItem = (props:any) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');

    return (
        <Box key={props.item.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                as={ReactLink}
                                to={props.item.route}
                                p={2}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {props.item.label}
                            </Link>
                        </PopoverTrigger>
                    </Popover>
                </Box>
    )
}


export const AuthButton = (props:any) => {
    return (
        <Button
            isLoading={!props.authVars.isAuthenticated && props.authVars.isAuthenticating}
            onClick={!props.authVars.isAuthenticated ? 
                        props.authVars.authenticate :
                        props.authVars.logout}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
            bg: 'pink.300',
        }}>
            {!props.authVars.isAuthenticated ? "Authenticate" : "Logout"}
        </Button>
    )
}


export const AuthError = (props: any) => {


    return (
        <div style={{ margin: "20px" }}>
        {props.authError && (
          <Alert status="error">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Authentication has failed</AlertTitle>
              <AlertDescription display="block">
                {props.authError.message}
              </AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
              ></CloseButton>
            </Box>
          </Alert>
        )}

        <Heading>AVADA</Heading>
      </div>
    )
}




