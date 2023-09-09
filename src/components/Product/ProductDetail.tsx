import {
  Box,
  Divider,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { ToMoney, convertDateFormat } from "../../services/helper";
import { ProductData, ProductStockData } from "../../services/dto";

interface Props {
  product: ProductData | null;
  isOpen: boolean;
  onClose: () => void;
  onAddCart: (item: ProductStockData) => void;
  onRemoveCart: (item: ProductStockData) => void;
}

const ProductDetail = ({
  product,
  isOpen,
  onClose,
  onAddCart,
  onRemoveCart,
}: Props) => {
  if (!product) return <></>;

  return (
    <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody marginTop={2}>
          <HStack>
            <Box
              alignSelf={"end"}
              fontSize={"1.1rem"}
              fontWeight={"semibold"}
              color={"blue.500"}
            >
              {product.product_id}
            </Box>
            <Box alignSelf={"end"}>{product.product_name}</Box>
          </HStack>
          <Divider marginY={3} />
          <SimpleGrid columns={2}>
            <VStack spacing={0} alignItems={"start"}>
              <Box>Jumlah Item</Box>
              <Box fontWeight={"semibold"}>
                {product.stock > 0 ? product.stock : "-"}
              </Box>
            </VStack>
            <VStack spacing={0} alignItems={"start"}>
              <Box>Harga Avg</Box>
              <Box fontWeight={"semibold"}>
                {product.avg_price ? ToMoney(product.avg_price) : "-"}
              </Box>
            </VStack>
            <VStack spacing={0} alignItems={"start"}>
              <Box>Berat</Box>
              <Box fontWeight={"semibold"}>
                {product.weight ? product.weight + " g" : "-"}
              </Box>
            </VStack>
          </SimpleGrid>
          <Divider marginY={5} />
          <Box marginBottom={3}>
            <Box
              fontWeight={"semibold"}
              fontSize={"1.1rem"}
              marginLeft={3}
              marginBottom={3}
            >
              Detail Produk
            </Box>
            <TableContainer>
              <Table size={"md"}>
                <Thead>
                  <Tr>
                    <Th>Harga Beli</Th>
                    <Th>Tanggal Pembelian</Th>
                    <Th>Catatan</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {product.items.map((item) =>
                    item.status == "available" ? (
                      <Tr key={item.product_stock_id}>
                        <Td>{ToMoney(item.buy_price)}</Td>
                        <Td>{convertDateFormat(item.buy_at)}</Td>
                        <Td>{item.note}</Td>
                        <Td>
                          <Icon
                            color={"blue.300"}
                            onClick={() => onAddCart(item)}
                            className="cursor-pointer"
                            as={BsCartPlus}
                          />
                        </Td>
                      </Tr>
                    ) : (
                      <Tr color={"gray.300"} key={item.product_stock_id}>
                        <Td>{ToMoney(item.buy_price)}</Td>
                        <Td>{convertDateFormat(item.buy_at)}</Td>
                        <Td>{item.note}</Td>
                        <Td>
                          <Icon
                            color={"red.300"}
                            onClick={() => onRemoveCart(item)}
                            className="cursor-pointer"
                            as={BsCartDash}
                          />
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetail;
