import { Box, Flex, Heading, Image, Text, Button, List, ListItem, ListIcon, Divider } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link"
import { CheckIcon } from "@chakra-ui/icons"

const planData = {
    headerTitle: "Basic",
    feeTitle: "Monthly fee",
    image: "https://instagram.fbru1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/102355502_148787523427678_5577033018152814390_n.jpg?_nc_ht=instagram.fbru1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=LSKZHrne1BEAX-fSw1W&tp=1&oh=46795c27be2339f5a978d3983f9d75bb&oe=600505D7",
    nbRecipe: 10,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus quia!",
    btnTitle: "Choose this plan"
}

export const PlanCard = () => {

    return (
        <Flex maxW="450px" shadow="lg" bgColor="whitesmoke" borderWidth="1px" borderColor="gray.200" borderRadius="sm" >
            <Box p={4}>
                <Flex  direction="column">
                    <Box alignSelf="center" w={{ base: "50%", sm: "50%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                        <Image size="80%" src={planData.image} />
                    </Box>
                    <Heading py={4} textAlign="center" size="md" textColor="gray.700" fontWeight="bold" >
                        {planData.headerTitle}
                    </Heading>
                    <Text px={8} py={4} fontSize="md" color="gray.400" fontWeight="bold" textAlign="center">{planData.desc}</Text>

                    <List px={8} textColor="gray.500" fontWeight="semibold" >
                        <ListItem>
                            <ListIcon as={CheckIcon} color="gray.400" />
                            Up to {planData.nbRecipe} recipes
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="gray.400" />
                            Quality advices
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="gray.400" />
                            Lorem Ipsum
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="gray.400" />
                            Lorem Ipsum
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="gray.400" />
                            Lorem Ipsum
                        </ListItem>
                    </List>

                    <Divider mt={2} w="50%" alignSelf="center" color="gray.500" />

                    <Flex direction="row" m="auto" pt={4}>
                    <Text fontSize="2xl" fontWeight="bold">$5</Text>
                        <Text color="gray.600" fontSize="md" justifyContent="flex-end" alignSelf="flex-end"> /month</Text>
                    </Flex>
                    <NextLink href="/signup" >
                        <Button my={4} mx={8} bgColor="teal.600" textColor="white" _hover={{}} >
                            {planData.btnTitle}
                        </Button>
                    </NextLink>
                </Flex>
            </Box>
        </Flex>
    )
}