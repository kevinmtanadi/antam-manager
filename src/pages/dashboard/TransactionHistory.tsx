import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Divider,
  HStack,
  Icon,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import TransactionDetail from "../../components/Transaction/TransactionDetail";
import { ToMoney, convertDateFormat } from "../../services/helper";

const transactions = [
  {
    transaction_id: "48",
    created_at: "2023-09-01 18:21:24",
    total_sale: null,
    total_buy: 1000000,
    purchase: [
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      },
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      },
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      },
    ],
    sales: [],
  },
  {
    transaction_id: "49",
    created_at: "2023-09-01 18:21:28",
    total_sale: null,
    total_buy: 1000000,
    purchase: [
      {
        transaction_purchase_id: "10",
        product_id: "UBS1",
        product_name: "UBS 1gr",
        buy_price: 1000000,
      },
    ],
    sales: [],
  },
  {
    transaction_id: "50",
    created_at: "2023-09-01 18:26:15",
    total_sale: null,
    total_buy: null,
    purchase: [],
    sales: [],
  },
  {
    transaction_id: "51",
    created_at: "2023-09-01 18:26:23",
    total_sale: null,
    total_buy: null,
    purchase: [],
    sales: [],
  },
  {
    transaction_id: "52",
    created_at: "2023-09-01 18:26:24",
    total_sale: null,
    total_buy: null,
    purchase: [],
    sales: [],
  },
  {
    transaction_id: "57",
    created_at: "2023-09-01 18:27:53",
    total_sale: 1050000,
    total_buy: 2000000,
    purchase: [
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      },
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      },
    ],
    sales: [
      {
        transaction_sale_id: "3",
        product_id: "UBS1",
        product_name: "UBS 1gr",
        buy_price: 1000000,
        sale_price: 1050000,
      },
      {
        transaction_sale_id: "4",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
        sale_price: 1050000,
      },
    ],
  },
];

const TransactionHistory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [chosenTransaction, setChosenTransaction] = useState<any>(null);

  const openModal = (item: any) => {
    setChosenTransaction(item);
    onOpen();
  };

  return (
    <>
      <VStack>
        {transactions.map((item, idx) => (
          <HStack width={"100%"} alignItems={"start"} spacing={5}>
            <Card
              height={"270px"}
              marginBottom={idx != transactions.length - 1 ? "10px" : "0px"}
              width={"80%"}
              minWidth={"300px"}
              maxWidth={"1000px"}
            >
              <CardBody>
                <HStack justifyContent={"space-between"}>
                  <Badge colorScheme="whatsapp">{item.transaction_id}</Badge>
                  <Box fontWeight={"semibold"}>
                    {convertDateFormat(item.created_at)}
                  </Box>
                </HStack>
                <Divider marginY={5} borderColor={"rgba(0,0,0,0.3)"} />
                <SimpleGrid columns={2} spacingX={0} spacingY={5}>
                  <VStack spacing={0} alignItems={"start"}>
                    <Box>Total Pembelian</Box>
                    <Box fontWeight={"bold"}>
                      {item.total_buy ? ToMoney(item.total_buy) : "-"}
                    </Box>
                  </VStack>
                  <VStack spacing={0} alignItems={"start"}>
                    <Box>Total Penjualan</Box>
                    <Box fontWeight={"bold"}>
                      {item.total_sale ? ToMoney(item.total_sale) : "-"}
                    </Box>
                  </VStack>
                  <VStack spacing={0} alignItems={"start"}>
                    <Box>Item Dibeli</Box>
                    <Box fontWeight={"bold"}>
                      {item.purchase.length != 0 ? item.purchase.length : "-"}
                    </Box>
                  </VStack>
                  <VStack spacing={0} alignItems={"start"}>
                    <Box>Item Terjual</Box>
                    <Box fontWeight={"bold"}>
                      {item.sales.length != 0 ? item.sales.length : "-"}
                    </Box>
                  </VStack>
                </SimpleGrid>
                <Divider marginY={5} borderColor={"rgba(0,0,0,0.3)"} />
                <Button
                  borderRadius={"2px"}
                  colorScheme="telegram"
                  fontWeight={"normal"}
                  fontSize={"0.925rem"}
                  onClick={() => openModal(item)}
                >
                  Lihat Detail
                </Button>
              </CardBody>
            </Card>
            <Card height={"270px"} width={"235px"}>
              <CardBody>
                <Box>Catatan</Box>
              </CardBody>
            </Card>
          </HStack>
        ))}
      </VStack>
      <TransactionDetail
        onClose={onClose}
        isOpen={isOpen}
        purchase={chosenTransaction ? chosenTransaction.purchase : null}
        sales={chosenTransaction ? chosenTransaction.sales : null}
        date={chosenTransaction ? chosenTransaction.created_at : null}
        totalPurchase={chosenTransaction ? chosenTransaction.total_buy : null}
        totalSales={chosenTransaction ? chosenTransaction.total_sale : null}
      />
    </>
  );
};

export default TransactionHistory;
