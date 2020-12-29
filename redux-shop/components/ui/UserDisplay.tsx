import React from "react"
import { Heading, Text } from "@chakra-ui/react"
import { useCurrentUserQuery } from "../../generated/graphql"
import { isServer } from "../../utils/isServer"


export const UserDisplay = () => {

    const [{ data, fetching }] = useCurrentUserQuery({ pause: isServer() })
   

    let username = ""
    
    if(fetching) {

    }else if(!data?.currentUser){
        username = ""
    }
    else {
        username = data.currentUser.username
    }
    
    return (
        <>  
            <Heading fontSize="4xl" fontWeight="bold">Good day, {username}</Heading>
            <Text fontSize="sm">We are the 3rd of July, There is actually 3PM</Text>
        </>
    )
}