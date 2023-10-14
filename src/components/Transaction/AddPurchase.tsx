import {
  Box,
  Button,
  HStack,
  Icon,
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
import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "../../App";
import NumberInput from "../NumberInput";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import id from "date-fns/locale/id";
registerLocale("id", id);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    product_id: string,
    product_stock_id: string,
    product_name: string,
    buy_price: number
  ) => void;
  needDate?: boolean;
}

const AddPurchase = ({ isOpen, onClose, onSubmit, needDate }: Props) => {
  const api = useContext(ApiContext);

  const { data } = api.getProductOption();

  const chosen_product_ref = useRef<HTMLSelectElement>(null);
  const no_serial_ref = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState(0);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setPrice(0);
  }, [isOpen]);

  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        document.getElementById("submit-btn")?.click();
      }
    };

    document.addEventListener("keydown", handleEnterPress);

    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  const onPriceChange = (value: number) => {
    setPrice(value);
  };

  const addToPurchaseList = () => {
    const chosen_product_id = chosen_product_ref.current?.value;
    const no_serial = no_serial_ref.current?.value;
    if (chosen_product_id && price && no_serial) {
      const chosen_product = data?.find(
        (item) => item.product_id === chosen_product_id
      );
      if (!chosen_product) return;
      console.log(no_serial);
      onSubmit(
        chosen_product?.product_id,
        no_serial,
        chosen_product?.product_name,
        price
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
              {data?.map((item, idx) => (
                <option value={item.product_id} key={idx}>
                  {item.product_id} - {item.product_name}
                </option>
              ))}
            </Select>
            <label htmlFor="no_serial">No. Serial</label>
            <Input
              ref={no_serial_ref}
              id="no_serial"
              placeholder="No. Serial"
            />
            <label htmlFor="buy_price">Harga Beli</label>
            <NumberInput
              value={price}
              onChangeValue={(value) => onPriceChange(value)}
            />
            {needDate && (
              <VStack alignItems={"start"} width={"100%"}>
                <Box>Tanggal Pembelian</Box>
                <HStack
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  borderRadius={"5px"}
                  padding={"6px"}
                  width={"100%"}
                >
                  <Icon fontSize={"1.25rem"} as={AiOutlineCalendar} />
                  <DatePicker
                    className="font-size-1"
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    locale={"id"}
                    dateFormat={"dd/MM/yyyy"}
                  />
                </HStack>
              </VStack>
            )}
          </VStack>

          <HStack justifyContent={"end"} marginTop={5} marginBottom={4}>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button
              id="submit-btn"
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
