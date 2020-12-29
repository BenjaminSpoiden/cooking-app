import { Box, Button, Flex, Heading, Stack, Text, Image, SimpleGrid, transition } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link"


const HeroData = {
    title: "Your recipe database",
    subtitle: "Quality digital cookbook designed by our experienced team for you to enjoy.",
    image: "https://source.unsplash.com/collection/3139185/800x600",
    ctaText: "Register now",
    ctaLink: "/signup"
}

export const Hero = ({id = ""}) => {

    
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
            <Stack
                spacing={4}
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
                    {HeroData.title}
                </Heading>
             
                <Heading
                    as="h2"
                    size="md"
                    color="gray.400"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                    >
                    {HeroData.subtitle}
                </Heading>

                <SimpleGrid columns={[1, 2]} gap={4}>
                    <NextLink href={HeroData.ctaLink} >
                        <Button
                            lineHeight="1"
                            fontSize="md"
                            fontWeight="600"
                            bgColor="whitesmoke"
                            color="teal.600"
                            _hover={{ bgColor:"teal.600", color:"whitesmoke", transition:"ease all 0.3s" }}
                        >
                            {HeroData.ctaText}
                        </Button>
                    </NextLink>
                </SimpleGrid>
                <Text
                    fontSize="xs"
                    mt={2}
                    textAlign="center"
                    color="gray.600"
                >
                    No credit card required.
                </Text>
            </Stack>
            <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                <Image src={HeroData.image} size="100%" rounded="1rem" shadow="2xl" />
            </Box>
        </Flex>
    )
}