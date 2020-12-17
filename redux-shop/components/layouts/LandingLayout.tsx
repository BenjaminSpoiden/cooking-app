import { Flex } from "@chakra-ui/react"
import React from "react"
import { Navbar } from "../sections/Navbar"

export const LandingLayout = ({children}) => {
    return (
        <>
            <Flex
                direction="column"
                align="center"
                maxW={{xl: "1440px"}}
                m="auto"
                px={[0, 2, 4]}
            >
                {children}
            </Flex>
        </>
    )
}