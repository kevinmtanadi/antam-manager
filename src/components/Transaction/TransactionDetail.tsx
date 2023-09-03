import {
  Box,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  VStack,
  Card,
  CardBody,
  Center,
} from "@chakra-ui/react";
import { ToMoney } from "../../services/helper";

interface Props {
  purchase?: TransactionPurchase[];
  sales?: TransactionSales[];
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

const TransactionDetail = ({ purchase, sales }: Props) => {
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th bg={"red.200"}>PENJUALAN</Th>
              <Th bg={"green.200"}>PEMBELIAN</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td bg={"red.100"} width={"50%"}>
                {sales && sales?.length > 0 ? (
                  sales.map((item) => (
                    <Card marginBottom={sales.length > 1 ? "20px" : "0px"}>
                      <CardBody bg={"red.200"}>
                        <HStack justifyContent={"space-between"}>
                          <VStack>
                            <Box fontWeight={"bold"}>Kode Antam</Box>
                            <Box>{item.product_id}</Box>
                          </VStack>
                          <VStack>
                            <Box fontWeight={"bold"} textAlign={"start"}>
                              Nama Produk
                            </Box>
                            <Box>{item.product_name}</Box>
                          </VStack>
                          <VStack>
                            <Box fontWeight={"bold"} textAlign={"start"}>
                              Harga Beli
                            </Box>
                            <Box>{ToMoney(item.buy_price)}</Box>
                          </VStack>
                          <VStack>
                            <Box fontWeight={"bold"} textAlign={"start"}>
                              Harga Jual
                            </Box>
                            <Box>{ToMoney(item.sale_price)}</Box>
                          </VStack>
                          <VStack>
                            <Box fontWeight={"bold"} textAlign={"start"}>
                              Profit
                            </Box>
                            <Box>
                              {ToMoney(item.sale_price - item.buy_price)}
                            </Box>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))
                ) : (
                  <Center>Tidak ada data penjualan</Center>
                )}
              </Td>
              <Td bg={"green.100"} width={"50%"}>
                {purchase && purchase?.length > 0 ? (
                  purchase?.map((item) => (
                    <Card bg={"green.200"}>
                      <CardBody>
                        <HStack justifyContent={"space-around"}>
                          <VStack>
                            <Box fontWeight={"bold"}>Kode Antam</Box>
                            <Box>{item.product_id}</Box>
                          </VStack>
                          <VStack>
                            <Box fontWeight={"bold"}>Nama Produk</Box>
                            <Box>{item.product_name}</Box>
                          </VStack>
                          <VStack>
                            <Box fontWeight={"bold"}>Harga Beli</Box>
                            <Box>{ToMoney(item.buy_price)}</Box>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))
                ) : (
                  <Center>Tidak ada data pembelian</Center>
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionDetail;
