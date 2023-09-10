import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { ApiContext } from "../../App";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    product_stock_id: string,
    product_name: string,
    buy_price: number
  ) => void;
}

const AddPurchase = ({ isOpen, onClose, onSubmit }: Props) => {
  const api = useContext(ApiContext);

  const { data, status, isLoading } = api.getProductOption();

  const chosen_product_ref = useRef<HTMLSelectElement>(null);
  const buy_price_ref = useRef<HTMLInputElement>(null);

  const addToPurchaseList = () => {
    const buy_price = buy_price_ref.current?.value;
    const chosen_product_id = chosen_product_ref.current?.value;
    if (chosen_product_id && buy_price) {
      console.log(buy_price);

      const chosen_product = data?.find(
        (item) => item.product_id === chosen_product_id
      );
      console.log(chosen_product);
      if (!chosen_product) return;
      onSubmit(
        chosen_product?.product_id,
        chosen_product?.product_name,
        parseInt(buy_price)
      );
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Beli</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"start"}>
            <Select ref={chosen_product_ref}>
              {data?.map((item) => (
                <option value={item.product_id}>{item.product_name}</option>
              ))}
            </Select>
            <label htmlFor="buy_price">Harga Beli</label>
            <Input id="buy_price" ref={buy_price_ref}></Input>
          </VStack>

          <HStack justifyContent={"end"} marginTop={5} marginBottom={4}>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button
              onClick={() => addToPurchaseList()}
              type="submit"
              colorScheme="whatsapp"
            >
              Tambahkan
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPurchase;
