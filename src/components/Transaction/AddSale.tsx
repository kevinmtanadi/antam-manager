import {
  Box,
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
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "../../App";
import { ProductStockData } from "../../services/dto";
import { ToMoney } from "../../services/helper";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product_stock_id: string) => void;
}

const AddSale = ({ isOpen, onClose, onSubmit }: Props) => {
  const api = useContext(ApiContext);
  const [hasFound, setHasFound] = useState(false);
  useEffect(() => {
    setHasFound(false);
  }, [isOpen]);

  const [_, setProductId] = useState("");
  const [productStockList, setProductStockList] = useState<
    ProductStockData[] | null
  >(null);

  const p_id_ref = useRef<HTMLInputElement>(null);
  const ps_id_ref = useRef<HTMLSelectElement>(null);

  const toast = useToast();

  const onSearch = () => {
    const product_code = p_id_ref.current?.value;
    if (!product_code) return;

    api.searchProductStock(product_code)?.then((resp) => {
      const data = resp.data;
      console.log(data);
      if (data.status != 200) {
        toast({
          title: "Produk tidak ditemukan",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        setProductId(product_code);
        setProductStockList(data.data);
        setHasFound(true);
      }
    });
  };

  const addToSaleList = () => {
    const product_stock_id = ps_id_ref.current?.value;
    if (product_stock_id) {
      onSubmit(product_stock_id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Jual</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"start"}>
            <Input
              type="text"
              name="product_code"
              placeholder="Kode produk"
              ref={p_id_ref}
            />
            <Button
              onClick={() => onSearch()}
              type="submit"
              colorScheme="telegram"
            >
              Cari produk
            </Button>
          </VStack>

          {hasFound && productStockList && productStockList?.length > 0 && (
            <VStack marginTop={3} alignItems={"start"}>
              <Select ref={ps_id_ref}>
                {productStockList.map((item) => (
                  <option
                    key={item.product_stock_id}
                    value={item.product_stock_id}
                  >
                    <HStack width={"100%"} justifyContent={"space-between"}>
                      <Box>
                        {item.product_stock_id} - {ToMoney(item.buy_price)}
                      </Box>
                    </HStack>
                  </option>
                ))}
              </Select>
            </VStack>
          )}
          <HStack justifyContent={"end"} marginTop={5} marginBottom={4}>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button
              onClick={() => addToSaleList()}
              isDisabled={!hasFound}
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

export default AddSale;
