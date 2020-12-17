import { Box, Text, Image, SimpleGrid, Flex, Heading, Icon } from "@chakra-ui/react"
import React from "react"
import { BiCalendarEvent } from "react-icons/bi"

export const HowCard = () => {
    return (
        <Box bgColor="white" borderRadius="lg" shadow="lg"  p={4}>
            <SimpleGrid>
                <SimpleGrid display={{base:"flex", md: "flex"}} alignItems="center">
                    <Box pr="4">
                    <Icon as={BiCalendarEvent} w="8" h="8" color="teal.600" />
                    </Box>
                    <SimpleGrid >
                        <Box 
                            fontWeight="bold"
                            as="h4"
                            fontSize="xl"
                            isTruncated
                            color="gray.900"
                        >
                            Heading 1
                        </Box>
                        <Text color="gray.500" textAlign="justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Text>
                    </SimpleGrid>
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    )
}