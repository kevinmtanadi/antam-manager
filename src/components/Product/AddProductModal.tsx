import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const AddProductModal = ({isOpen, onClose}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                "testing"
            </ModalBody>
            <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme='whatsapp'>Tambahkan</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default AddProductModal