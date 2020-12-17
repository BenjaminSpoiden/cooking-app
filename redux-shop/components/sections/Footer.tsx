import { Divider, Flex, SimpleGrid, Text, Heading, List, ListItem, Input, Textarea, InputGroup, InputLeftElement, Icon, ListIcon, HStack, Stack } from "@chakra-ui/react"
import React from "react"
import { AtSignIcon, CalendarIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { AiFillFacebook, AiOutlineInstagram, AiOutlineTwitter, AiOutlineUser } from 'react-icons/ai'
import { MdSubject } from 'react-icons/md'
import { GiPositionMarker } from 'react-icons/gi'
import NextLink from 'next/link'

type SocialIcon = {
    as: React.ElementType<any>, 
    to?: string
}

const SocialIcon = ({as, to = "/"}: SocialIcon) => {

    return(
        <NextLink href={to}>
            <Icon as={as} w="8" h="8" cursor="pointer" />
        </NextLink>
    )
}

export const Footer = () => {
    return (
        <Flex
            direction="column"
            align="center"
            as="footer"
            bgColor="teal.500"
            m="auto"
        >
            <SimpleGrid px={2} mt={4} mb={4} columns={[1, 1, 1, 3]}  maxW={{xl: "1440px"}} w={{base: "80%", md: "100%", lg:"80%"}} >
                <Flex
                    pt={4}
                    px={[0, 2, 4]}
                    direction="column"
                >
                    <Heading
                        textTransform="uppercase"
                        textColor="white"
                        fontSize="md"
                    >
                        Company Info
                    </Heading>
                    <Text color="white" size="sm" mb={8} textAlign="justify" lineHeight={10} >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Veritatis vel id incidunt eligendi cupiditate facilis, blanditiis, 
                        fugiat at dolorum ratione eaque aliquid, fugit repellat? 
                        Consequatur veniam minus obcaecati blanditiis cumque.
                        Eligendi cupiditate facilis, blanditiis.
                    </Text>
                </Flex>
                
                <Flex
                    pt={4}
                    px={[0, 2, 4]}
                    direction="column"
                >
                    <Heading
                        textTransform="uppercase"
                        textColor="white"
                        fontSize="md"
                    >
                        Contact info
                    </Heading>
                    <List color="white" size="sm" mb={8} mt={2} spacing={6}>
                        <ListItem>
                            <ListIcon as={GiPositionMarker} color="gray.800" />
                            10-13 Grosvenor Square, Mayfair, London W1K 6JP, Royaume-Uni
                        </ListItem>
                        <ListItem>
                            <ListIcon as={PhoneIcon} color="gray.800"/>
                            +2-111-222-555 / +3-111-874-854
                        </ListItem>
                        <ListItem>
                            <ListIcon as={EmailIcon} color="gray.800" />
                            mockProject@mock.com
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CalendarIcon} color="gray.800" />
                            9AM - 6PM Monday/Friday 
                        </ListItem>
                    </List>
                </Flex>
                
                <Flex
                    pt={4}
                    px={[0, 2, 4]}
                    direction="column"
                >
                    <Heading
                        textTransform="uppercase"
                        textColor="white"
                        fontSize="md"
                    >
                        Send us a message
                    </Heading>
                    <SimpleGrid columns={[1, 2]} spacing="4" mt={2} >
                        <InputGroup>
                            <InputLeftElement children={<Icon as={AiOutlineUser} color="gray.300" />} />
                            <Input bgColor="white" placeholder="Your Name" focusBorderColor="gray.700" borderColor="transparent" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<AtSignIcon color="gray.300" />} />
                            <Input bgColor="white" placeholder="Your Email address"  focusBorderColor="gray.700"  borderColor="transparent"  />
                        </InputGroup>
                    </SimpleGrid>

                    <InputGroup mt={4}>
                        <InputLeftElement children={<Icon as={MdSubject} color="gray.300" />} />
                        <Input bgColor="white" placeholder="Your subject" focusBorderColor="gray.700" borderColor="transparent"  />
                    </InputGroup>    
                    
                    <Textarea bgColor="white" placeholder="Your message" size="sm" mt={4} focusBorderColor="gray.700" borderColor="transparent"  />
                </Flex>
             </SimpleGrid>
            <Divider color="gray.800" opacity="0.2" />
            <Flex 
                direction="column"
                align="center"
                maxW={{xl: "1440px"}}
                m="0 auto"
                px={8}
                py={4}
            >
                <Flex>
                    <HStack spacing="8" color="white" >
                        <SocialIcon to="https://www.facebook.com/" as={AiFillFacebook} />
                        <SocialIcon to="https://twitter.com/" as={AiOutlineTwitter}/>
                        <SocialIcon to="https://www.instagram.com/" as={AiOutlineInstagram} />
                    </HStack>
                </Flex>
        
                <Text 
                    mt={4}
                    textTransform="uppercase" 
                    color="white"
                    fontSize="sm"
                    fontWeight="bold"
                    textAlign={["center", "center", "justify"]}>
                    <NextLink href="">Terms and conditions</NextLink> &bull; <NextLink href="" >Privacy Policy</NextLink>   
                </Text>
            </Flex>
            <Text
                color="white"
                fontSize="xs"
                textAlign={["center", "center", "justify"]}
                pb={4}
            >
                Copyright &copy; All right reserved to Cooking Inc. &mdash; 2020
            </Text>
        </Flex>
    )
}