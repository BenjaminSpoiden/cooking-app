import { Box, Flex, Heading, Image, Text, Button } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link"

const planData = {
    headerTitle: "Heading Text",
    feeTitle: "Monthly fee",
    image: "https://instagram.fbru1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/102355502_148787523427678_5577033018152814390_n.jpg?_nc_ht=instagram.fbru1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=LSKZHrne1BEAX-fSw1W&tp=1&oh=46795c27be2339f5a978d3983f9d75bb&oe=600505D7",
    nbRecipe: 20,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus quia!",
    btnTitle: "Choose this plan"
}

export const PlanCard = () => {

    return (
        <Flex maxW="425px" shadow="lg" bgColor="whitesmoke" borderWidth="1px" borderColor="gray.200" borderRadius="md" >
            <Box p={4}>
                <Flex  direction="column">
                    <Heading textAlign="center" >
                        {planData.headerTitle}
                    </Heading>
                    <Text color="gray.600" fontSize="xl" textAlign="center" >
                        {planData.feeTitle}
                    </Text>
                    <Box alignSelf="center" w={{ base: "50%", sm: "50%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                        <Image size="80%" src={planData.image} />
                    </Box>
                    <Text textAlign="center" fontSize="xs">Up to {planData.nbRecipe} recipes.</Text>
                    <Text px={8} py={4} fontSize="md" color="gray.400" fontWeight="bold" textAlign="center">{planData.desc}</Text>

                    <NextLink href="/signup" >
                        <Button mb={4} mx={8} bgColor="teal.600" textColor="white" _hover={{}} >
                            {planData.btnTitle}
                        </Button>
                    </NextLink>
                </Flex>
            </Box>
        </Flex>
    )
}