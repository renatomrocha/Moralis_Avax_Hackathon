import {Flex} from "@chakra-ui/react";


export function NavHoverBox({displayHover, icon, title, description}: any) {

    return(<>
        {displayHover && (<>
                <Flex/>
                <Flex
                    h={200}
                    w={200}
                    flexDir="column"
                    alignItems="center"
                    justify="center"
                    backgroundColor='#FFB6C1'
                    borderRadius="10px"
                    textAlign="center"
                >

                </Flex>
            </>
            )}</>

    )

}