import { Avatar, AvatarGroup, Flex, Heading, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react"
import React from "react"
import { useFetchAvatar } from "../../hooks/useFetch"



export const OurTeam = ({id = ""}) => {

    const { data, isLoading } = useFetchAvatar("https://api.randomuser.me/")

    const avatar: string = data?.results[0]?.picture?.large

    console.log(avatar)

    return (
        <Flex
            id={id}
            align="center"
            minH="60vh"
            px={2}
            bgColor="teal.500"
        >
            <Flex
                direction="column"
                align="center"
                maxW={{xl: "1440px"}}
                m="0 auto"
            >
                <Heading mt={8} mb={2} p={4} as="h2" size="2xl" textAlign="center" color="white" maxW="768px">
                    +10 peoples working around the clock
                </Heading>
                <Wrap mb={8} spacing="10px" justify="center" p={4} maxW="768px">
                    {
                        Array(13)
                        .fill("")
                        .map((_, index) => (
                            <WrapItem>
                                <Avatar size="xl" key={index * 450} name="Gordon Ramsay" src={isLoading ? "" : avatar} />
                            </WrapItem>
                        ))
                    }

                </Wrap>
            </Flex>
            
        </Flex>
    )
}