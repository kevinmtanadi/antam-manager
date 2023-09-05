import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Produk Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ product_code: "", product_name: "" }}
            validationSchema={Yup.object({
              product_code: Yup.string().required("Kode produk wajib diisi"),
              product_name: Yup.string().required("Nama produk wajib diisi"),
            })}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <VStack>
                  <InputField
                    type="text"
                    name="product_code"
                    placeholder="Kode produk"
                  />
                  <InputField
                    type="text"
                    name="product_name"
                    placeholder="Nama produk"
                  />
                </VStack>
                <HStack justifyContent={"end"} marginTop={5} marginBottom={4}>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Batal
                  </Button>
                  <Button type="submit" colorScheme="whatsapp">
                    Tambahkan
                  </Button>
                </HStack>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
