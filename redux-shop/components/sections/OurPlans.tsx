import { Box, Flex, Heading, Stack, Image, Text, SimpleGrid, Divider, HStack, StackDivider } from "@chakra-ui/react"
import React from "react"
import { PlanCard } from "../ui/PlanCard"


export const OurPlans = ({id = ""}) => {

    return (
        <Flex
            id={id}
            align="center"
            wrap="wrap"
            minH="100vh"
            px={2}
            mb={16}
        >
            <Flex direction="column">
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="teal.600"
                    textAlign="center"
                    mt={8}
                >
                    The plans for you
                </Heading>
                <Stack 
                    mt={16}
                    spacing={4} 
                    direction={["column", "column", "column", "row"]} maxW="1024px" 
                    divider={<StackDivider color="gray.200" />}
                    >  
                    <PlanCard />
                    <PlanCard />
                    <PlanCard />
                </Stack>
            </Flex>
        </Flex>
    )
}