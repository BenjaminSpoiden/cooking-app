import React, { useState } from "react"
import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react"
import NextLink from "next/link"
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link as ScrollLink } from "react-scroll"
import { animateScroll } from "react-scroll"


type NavBarProps = {
    scrollAmout: number
}

const MenuItems = ({children, to = "/", isLast = false}) => {
    return (
        <Text
            mr={{ base: 0, sm: isLast ? 0 : 10 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            size="md" 
            textColor="teal.600"
            fontWeight="bold"
            fontSize="lg"
            cursor="pointer"
        >   
            <ScrollLink to={to} smooth duration={1000}>{children}</ScrollLink>
        </Text>
    )
}

export const Navbar = ({scrollAmout}: NavBarProps) => {
    
    const [show, setShow] = useState(false)
    const toggleMenu = () => setShow(c => !c)

    return (
        <Flex  
            as="nav"
            position="fixed"
            align="center"
            zIndex={1}
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            shadow={scrollAmout > 0 ? "sm" : "none"}
            bgColor={scrollAmout > 0 ? "white" : "transparent"}
        >
            <Flex>
                <Heading cursor="pointer" size="md" color="whitesmoke" textColor="teal.600" onClick={() => animateScroll.scrollToTop()} >
                    Cooking App
                </Heading>
            </Flex>

            <Box mt="1" d={["flex", "flex", "flex", "none"]} onClick={toggleMenu} >{ show ? <CloseIcon /> : <HamburgerIcon /> }</Box>

            <Flex flexBasis={{base:"100%", md: "auto"}} d={["none", "none", "none", "flex"]}>
                <MenuItems to="valueSection">Our Values</MenuItems>
                <MenuItems to="teamSection">Our Team</MenuItems>
                <MenuItems to="aboutUsSection" isLast>Our Plans</MenuItems>
            </Flex>

            <Flex flexBasis={{base:"100%", md: "auto"}} d={["none", "none", "none", "flex"]}>
                <NextLink href="/login">
                        <Button size="md" colorScheme="gray" w="125px" mr="4">
                            <Text fontWeight="bold" color="teal.600">Login</Text>
                        </Button>
                    </NextLink>

                    <NextLink href="/signup">
                        <Button size="md" colorScheme="gray" w="125px">
                            <Text fontWeight="bold" color="teal.600">Signup</Text>
                        </Button>
                </NextLink>
            </Flex>
        </Flex>
    )
}
