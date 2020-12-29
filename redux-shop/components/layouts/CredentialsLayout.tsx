import { Flex } from "@chakra-ui/react"
import React from "react"

export const CredentialsLayout = ({children}) => {
    return(
        <>
            <Flex
                direction="column"
                maxW="550px"
                m="auto"
                px="4"
                
            >
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    wrap="wrap"
                    minH="100vh"
                    px={2}
                    mb={16}
                >
                    <Flex
                        direction="column" 
                        shadow="xl" 
                        p={8} 
                        borderRadius="lg" 
                        w="100%"
                        borderColor="teal.600"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderBottomWidth="5px"
                        borderBottomColor="teal.600"
                        borderBottomStyle="solid" 
                        
                    >
                        {children}
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}