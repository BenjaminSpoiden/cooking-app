import React from "react"
import { Avatar,Flex, Icon, List, ListItem, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Tooltip, useDisclosure } from "@chakra-ui/react"
import { FaHome, FaShoppingCart, FaLeaf } from "react-icons/fa"
import { useLogoutMutation } from "../../generated/graphql"
import { useRouter } from 'next/router'
import { CustomModal } from "./Modal"

export const VerticalNavbar = () => {

    const [{fetching}, logoutUser] = useLogoutMutation()
    const router = useRouter()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const signOut = () => {
        if(!fetching) {
            logoutUser()
            router.push("/")
        }
    }
    return (
        <>
            <CustomModal isOpen={isOpen} onClose={onClose} />
            <nav>
                <Flex position="fixed" justifyContent="center" minHeight="100%" minWidth="48px" bgColor="teal.600" fontSize="2rem" color="white">
                    <List spacing={2}>
                        
                        <Tooltip shouldWrapChildren hasArrow label="Home" fontSize="sm" placement="right" >
                            <ListItem>
                                <Icon as={FaHome} w="24px" />
                            </ListItem>
                        </Tooltip>

                        <Tooltip shouldWrapChildren hasArrow label="Shopping Cart" fontSize="sm" placement="right">
                            <ListItem>
                                <Icon as={FaShoppingCart} w="24px" />
                            </ListItem>
                        </Tooltip>

                        <Tooltip shouldWrapChildren hasArrow label="Diet & Health" fontSize="sm" placement="right"> 
                            <ListItem>
                                <Icon as={FaLeaf} w="24px" />
                            </ListItem>
                        </Tooltip>

                        <Flex position="absolute" bottom={0}>
                            <Flex justifyContent="center">
                                <List spacing={2}>
                                    <ListItem>
                                        <Menu isLazy>
                                            <MenuButton>
                                                <Avatar ml="-4px" size="sm" name="Avatar K" src=""/>
                                            </MenuButton>
                                            <MenuList color="black">
                                                <MenuGroup title="Profile">
                                                    <MenuItem fontSize="md" onClick={onOpen}>Update Profile</MenuItem>
                                                    <MenuItem fontSize="md">My Wishlist</MenuItem>
                                                    <MenuItem fontSize="md" textColor="red.500" onClick={() => signOut()}>Log out</MenuItem>
                                                </MenuGroup>
                                                <MenuDivider color="gray.200"/>
                                                <MenuGroup title="Feedback">
                                                    <MenuItem fontSize="md">Send us a feedback</MenuItem>
                                                </MenuGroup>
                                            </MenuList>
                                        </Menu>
                                    </ListItem>
                                </List>
                            </Flex>
                        </Flex>
                    </List>
                </Flex>
            </nav>
        </>
    )
}