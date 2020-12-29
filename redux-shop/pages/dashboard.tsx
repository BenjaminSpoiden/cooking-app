import { withUrqlClient } from "next-urql"
import React from "react"
import { createUrqlClient } from "../utils/createUrqlClient"
import Head from "next/head"
import { Flex, Grid, Heading, Text, Box, Input, InputGroup, InputLeftElement, InputRightElement, Divider } from "@chakra-ui/react"
import { VerticalNavbar } from "../components/ui/VerticalNavbar"
import { SearchIcon } from "@chakra-ui/icons"
import { UserDisplay } from "../components/ui/UserDisplay"

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Flex minHeight="100vh">
                <VerticalNavbar />
                <Flex minW="100%" pl="48px">
                    <Flex minW="100%" bgColor="whitesmoke" direction="column" p={10}>
                        <Flex direction="column" alignItems="flex-end">
                            <UserDisplay />
                        </Flex>

                        <Flex direction="column" pt={4}>
                            <Grid templateColumns="repeat(3, 1fr)" gap={6} >
                                <Box w="100%" h="250px" shadow="md" bgColor="teal.400" borderRadius="md" />
                                <Box w="100%" h="250px" shadow="md" bgColor="teal.400" borderRadius="md" /> 
                                <Box w="100%" h="250px" shadow="md" bgColor="teal.400" borderRadius="md" /> 
                            </Grid>
                        </Flex>

                        <Divider mt={10} color="gray.500" maxW="400px" alignSelf="center" />

                        <Flex mt={4} w="20%">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    fontSize="1.2em"
                                    children={<SearchIcon color="gray.300"/>}
                                />
                                <Input placeholder="Search for products (Ex: Banana, Potato, ...)"/>
                            </InputGroup>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
           
        </>
    )
}


export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard)