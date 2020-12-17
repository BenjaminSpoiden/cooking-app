import { Box, Text, Image, HStack, Link } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import React from "react"
import { GiCook } from "react-icons/gi"

const Card = () => {
   
    const data = {
        difficulty: 1,
        rating: 4
    }

    return (
        <Box p={4} display={{ md: "flex" }} borderWidth="1px" borderColor="gray.200" borderRadius="lg" _hover={{borderColor: "gray.400", transition:"ease 0.3s"}}>
            <Box flexShrink={0}>
                <Image
                    borderRadius="lg"
                    width={{ md: 80 }}
                    height={{ md: 300 }}
                    src="https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg"
                    alt="Woman paying for a purchase"
                    objectFit="cover"
                />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                
                <Text
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize="2xl"
                    letterSpacing="wide"
                    color="teal.600"
                >
                    Food Item Name
                </Text>
                
                <HStack mt={1} >
                    {
                        Array(3)
                        .fill("")
                        .map((_, index) => (
                            <StarIcon key={index} as={GiCook} color={index < data.difficulty ? "gray.900" : "gray.500"} />
                        ))
                    }
                </HStack>
                
                <Text mt="2" color="gray.500" textAlign="justify" >
                    Mêt Délicieux qui emoustillera vos papilles avec ces différentes saveurese venu tout droit
                    du terroir. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, magni? Pariatur a cum, modi placeat magnam numquam quae.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis libero illum, ullam qui suscipit reprehenderit recusandae, illo hic quas nam asperiores, adipisci amet tempore aliquid. Excepturi doloremque odio temporibus delectus!
                </Text>
                <Box mt="2" >Prix: 24,90 €</Box>

                <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                        .fill("")
                        .map((_, i) => (
                        <StarIcon
                            key={i}
                            color={i < data.rating ? "teal.500" : "gray.300"}
                        />
                        ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        <Link>34 reviews</Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Card