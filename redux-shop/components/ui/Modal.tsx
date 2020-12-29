import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import React from "react"

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
}

export const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Placeholder for formik form to update profile
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Save & Close
                    </Button>
                    <Button variant="ghost" onClick={onClose} >Discard Changes</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
