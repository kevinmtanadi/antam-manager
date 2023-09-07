import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  Text,
  Th,
  Icon,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { BsCartPlus, BsPencilSquare } from "react-icons/bs";
import { ToMoney, shortenString } from "../../services/helper";
import Product from "../../pages/dashboard/Product";

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export interface ProductDetail {
  product_stock_id: string;
  buy_price: number;
  buy_at: string;
  note: string | null;
}

const ProductDetail = ({ product, isOpen, onClose }: Props) => {
  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{product.product_name}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetail;
