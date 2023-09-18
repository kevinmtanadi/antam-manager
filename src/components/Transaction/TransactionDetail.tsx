import {
  Box,
  Divider,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import { RiCloseCircleLine } from "react-icons/ri";
import { ToMoney, convertDateFormat } from "../../services/helper";

interface Props {
  purchase?: TransactionPurchase[];
  sales?: TransactionSales[];
  date: string;
  totalPurchase: number;
  totalSales: number;
  isOpen: boolean;
  onClose: () => void;
}

export interface TransactionPurchase {
  transaction_purchase_id: string;
  product_id: string;
  product_name: string;
  buy_price: number;
}

export interface TransactionSales {
  transaction_sale_id: string;
  product_id: string;
  product_name: string;
  buy_price: number;
  sale_price: number;
}

const TransactionDetail = ({
  purchase,
  sales,
  totalPurchase,
  totalSales,
  isOpen,
  onClose,
  date,
}: Props) => {
  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <VStack marginTop={2} marginBottom={5}>
            <HStack
              marginBottom={"25px"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <span></span>
              <Box
                position={"absolute"}
                top={"10px"}
                left={"50%"}
                translateX={"-50%"}
                transform={"translate(-50%, 0%)"}
                fontWeight={"semibold"}
                fontSize={"1.35rem"}
              >
                Detail Transaksi
              </Box>
              <Icon
                position={"absolute"}
                right={"20px"}
                top={"10px"}
                fontSize={"1.85rem"}
                color={"rgba(0,0,0,0.6)"}
                className="cursor-pointer"
                as={RiCloseCircleLine}
                onClick={onClose}
              />
            </HStack>
            <HStack
              marginBottom={"10px"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Box></Box>
              <Box>{convertDateFormat(date)}</Box>
            </HStack>
            <VStack spacing={5} width={"100%"}>
              {purchase && purchase.length > 0 && (
                <Box width={"100%"}>
                  <Divider marginBottom={3} />
                  <Box
                    marginBottom={"10px"}
                    fontWeight={"semibold"}
                    fontSize={"1.05rem"}
                    paddingLeft={4}
                    color={"blue.500"}
                  >
                    Pembelian
                  </Box>
                  <TableContainer>
                    <Table variant={"unstyled"} size={"sm"}>
                      <Thead>
                        <Tr>
                          <Td fontWeight={"semibold"}>Kode Produk</Td>
                          <Td fontWeight={"semibold"}>Nama Produk</Td>
                          <Td textAlign={"right"} fontWeight={"semibold"}>
                            Harga Beli
                          </Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {purchase?.map((item) => (
                          <Tr key={item.transaction_purchase_id}>
                            <Td>{item.product_id}</Td>
                            <Td>{item.product_name}</Td>
                            <Td textAlign={"right"}>
                              {ToMoney(item.buy_price)}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"semibold"} colSpan={2}>
                            TOTAL PEMBELIAN
                          </Td>
                          <Td textAlign={"right"} fontWeight={"semibold"}>
                            {totalPurchase != 0 ? ToMoney(totalPurchase) : "-"}
                          </Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              {sales && sales.length > 0 && (
                <Box width={"100%"}>
                  <Divider marginBottom={3} />
                  <Box
                    marginBottom={"10px"}
                    fontWeight={"semibold"}
                    fontSize={"1.05rem"}
                    paddingLeft={4}
                    color={"blue.500"}
                  >
                    Penjualan
                  </Box>
                  <TableContainer>
                    <Table variant={"unstyled"} size={"sm"}>
                      <Thead>
                        <Tr>
                          <Td fontWeight={"semibold"}>Kode Produk</Td>
                          <Td fontWeight={"semibold"}>Nama Produk</Td>
                          <Td fontWeight={"semibold"}>Harga Beli</Td>
                          <Td fontWeight={"semibold"}>Harga Jual</Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sales?.map((item) => (
                          <Tr key={item.transaction_sale_id}>
                            <Td>{item.product_id}</Td>
                            <Td>{item.product_name}</Td>
                            <Td>{ToMoney(item.buy_price)}</Td>
                            <Td>{ToMoney(item.sale_price)}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"semibold"} colSpan={3}>
                            TOTAL PENJUALAN
                          </Td>
                          <Td fontWeight={"semibold"}>
                            {ToMoney(totalSales)}
                          </Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetail;
