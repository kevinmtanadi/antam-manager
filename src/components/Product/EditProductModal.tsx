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
import { EditProductData, ProductData } from "../../services/dto";
import InputField from "../InputField";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: EditProductData) => void;
  product: ProductData | null;
}

const EditProductModal = ({ isOpen, onClose, onSubmit, product }: Props) => {
  if (!product) return <></>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Produk</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              product_code: product.product_id,
              product_name: product.product_name,
              weight: product.weight,
            }}
            validationSchema={Yup.object({
              product_code: Yup.string().required("Kode produk wajib diisi"),
              product_name: Yup.string().required("Nama produk wajib diisi"),
              weight: Yup.number()
                .typeError("Berat harus berupa angka")
                .required("Berat harus diisi"),
            })}
            onSubmit={(values) => {
              onSubmit({
                product_id: product.product_id,
                new_product_id: values.product_code,
                product_name: values.product_name,
                weight: parseFloat(values.weight.toString()),
              });
              onClose();
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <VStack>
                  <InputField
                    label="Kode produk"
                    type="text"
                    name="product_code"
                    placeholder="Kode produk"
                  />
                  <InputField
                    label="Nama produk"
                    type="text"
                    name="product_name"
                    placeholder="Nama produk"
                  />
                  <InputField
                    label="Berat (gram)"
                    type="text"
                    name="weight"
                    placeholder="Berat (gram)"
                  />
                </VStack>
                <HStack justifyContent={"end"} marginTop={5} marginBottom={4}>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Batal
                  </Button>
                  <Button type="submit" colorScheme="whatsapp">
                    Simpan
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

export default EditProductModal;
