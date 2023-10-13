import {
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: string) => void;
  productId: string;
}

const DeleteProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  productId,
}: Props) => {
  if (!productId) return <></>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader></ModalHeader>
        <ModalBody>
          <VStack marginY={5}>
            <Box fontWeight={"semibold"} fontSize="1.1rem">
              Anda yakin ingin menghapus produk ini?
            </Box>
            <Box marginBottom={5} fontWeight={"semibold"} fontSize="1.1rem">
              Tindakan ini tidak dapat dikembalikan
            </Box>
            <Button colorScheme={"red"} onClick={() => onSubmit(productId)}>
              Hapus Produk
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProductModal;
