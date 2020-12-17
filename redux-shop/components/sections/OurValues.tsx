import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import React from "react"

const ValueData = {
    image: "https://source.unsplash.com/collection/1677590/800x600"
}

export const OurValues = ({id = ""}) => {
    return (
        <Flex
            id={id}
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="wrap"
            minH="100vh"
            px={2}
            mb={16}
        >
            <Box d={["none", "flex"]} w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                <Image src={ValueData.image} size="100%" rounded="1rem" shadow="2xl" />
            </Box>
            <Stack
                w={{base: "80%", md: "40%"}}
                align={["center", "center", "flex-start", "flext-start"]}
            >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="teal.600"
                        textAlign={["center", "center", "left", "left"]}
                    >
                        We value Quality over Quantity.
                    </Heading>
                    <Text  
                        fontSize="md"
                        color="gray.600"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign="justify"
                        mb="4"
                        >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Enim ullam blanditiis, eius, eveniet error voluptate debitis dignissimos molestias soluta quidem inventore autem, 
                        exercitationem aspernatur saepe perspiciatis dolorem ea.
                        Consequatur, praesentium?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cum molestias a aspernatur, 
                        soluta sed quasi culpa fugit aliquid blanditiis saepe dolorem sapiente ad unde maiores inventore quisquam exercitationem placeat?
                    </Text>
                    
            </Stack>    
        </Flex>
    )
}