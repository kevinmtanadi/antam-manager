import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Grid,
  HStack,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import { ToMoney } from "../../services/helper";
import AddProductModal from "../../components/Product/AddProductModal";

const products = [
  {
    product_id: "1",
    product_name: "Dummy Product 1",
    stock: 23,
    avg_price: 24.7826,
    items: [
      {
        product_stock_id: "1",
        buy_price: 10,
        buy_at: "2023-08-31 18:45:02",
        note: "testing",
      },
      {
        product_stock_id: "2",
        buy_price: 20,
        buy_at: "2023-08-31 18:45:02",
        note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos vel animi cupiditate magnam doloribus deleniti illum, nobis labore numquam! Optio fuga, ratione nesciunt quod voluptate pariatur dolorum quia eligendi quae nostrum assumenda numquam sed quibusdam praesentium, rem id repellat. Maxime, voluptates! Recusandae quis minus quibusdam totam ullam libero fugiat!",
      },
      {
        product_stock_id: "11",
        buy_price: 0,
        buy_at: "2023-08-31 13:41:26",
        note: null,
      },
      {
        product_stock_id: "12",
        buy_price: 0,
        buy_at: "2023-08-31 13:43:21",
        note: null,
      },
      {
        product_stock_id: "13",
        buy_price: 0,
        buy_at: "2023-08-31 13:43:40",
        note: null,
      },
      {
        product_stock_id: "14",
        buy_price: 30,
        buy_at: "2023-08-31 13:45:16",
        note: null,
      },
      {
        product_stock_id: "15",
        buy_price: 30,
        buy_at: "2023-08-31 13:46:57",
        note: null,
      },
      {
        product_stock_id: "16",
        buy_price: 30,
        buy_at: "2023-08-31 13:48:18",
        note: null,
      },
      {
        product_stock_id: "17",
        buy_price: 30,
        buy_at: "2023-08-31 13:48:35",
        note: null,
      },
      {
        product_stock_id: "18",
        buy_price: 30,
        buy_at: "2023-08-31 13:49:47",
        note: null,
      },
      {
        product_stock_id: "19",
        buy_price: 30,
        buy_at: "2023-08-31 13:50:33",
        note: null,
      },
      {
        product_stock_id: "20",
        buy_price: 30,
        buy_at: "2023-08-31 13:50:51",
        note: null,
      },
      {
        product_stock_id: "21",
        buy_price: 30,
        buy_at: "2023-08-31 13:51:39",
        note: null,
      },
      {
        product_stock_id: "22",
        buy_price: 30,
        buy_at: "2023-08-31 13:52:01",
        note: null,
      },
      {
        product_stock_id: "23",
        buy_price: 30,
        buy_at: "2023-08-31 13:52:11",
        note: null,
      },
      {
        product_stock_id: "24",
        buy_price: 30,
        buy_at: "2023-08-31 13:52:25",
        note: null,
      },
      {
        product_stock_id: "25",
        buy_price: 30,
        buy_at: "2023-08-31 13:52:30",
        note: null,
      },
      {
        product_stock_id: "26",
        buy_price: 30,
        buy_at: "2023-08-31 13:52:37",
        note: null,
      },
      {
        product_stock_id: "27",
        buy_price: 30,
        buy_at: "2023-08-31 13:52:50",
        note: null,
      },
      {
        product_stock_id: "28",
        buy_price: 30,
        buy_at: "2023-08-31 13:53:00",
        note: null,
      },
      {
        product_stock_id: "29",
        buy_price: 30,
        buy_at: "2023-08-31 13:55:12",
        note: null,
      },
      {
        product_stock_id: "30",
        buy_price: 30,
        buy_at: "2023-08-31 14:01:01",
        note: null,
      },
      {
        product_stock_id: "31",
        buy_price: 30,
        buy_at: "2023-08-31 14:01:32",
        note: null,
      },
    ],
  },
  {
    product_id: "2",
    product_name: "Dummy Product 2",
    stock: 0,
    items: [],
  },
  {
    product_id: "3",
    product_name: "Dummy Product 3",
    stock: 2,
    avg_price: 17,
    items: [
      {
        product_stock_id: "5",
        buy_price: 12,
        buy_at: "2023-08-31 18:45:02",
        note: null,
      },
      {
        product_stock_id: "6",
        buy_price: 22,
        buy_at: "2023-08-31 18:45:02",
        note: null,
      },
    ],
  },
  {
    product_id: "4",
    product_name: "Dummy Product 4",
    stock: 1,
    avg_price: 28,
    items: [
      {
        product_stock_id: "8",
        buy_price: 28,
        buy_at: "2023-08-31 18:45:02",
        note: null,
      },
    ],
  },
  {
    product_id: "5",
    product_name: "Dummy Product 5",
    stock: 6,
    avg_price: 19,
    items: [
      {
        product_stock_id: "9",
        buy_price: 14,
        buy_at: "2023-08-31 18:45:02",
        note: null,
      },
      {
        product_stock_id: "10",
        buy_price: 24,
        buy_at: "2023-08-31 18:45:02",
        note: null,
      },
    ],
  },
];

const Product = () => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const toggleRow = (rowId: string) => {
    if (expandedRowId === rowId) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(rowId);
    }
  };

  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
    <HStack marginBottom={3} width={'100%'} justifyContent={'space-between'}>
      <span></span>
      <Button onClick={() => onOpen()} colorScheme="whatsapp">Tambahkan Produk Baru</Button>
    </HStack>
    <Card>
      <CardBody>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th width={"150px"}>Kode Produk</Th>
                <Th>Nama Produk</Th>
                <Th>Stok</Th>
                <Th>Harga Avg</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((item) => (
                <React.Fragment key={item.product_id}>
                  <Tr
                    onClick={() => toggleRow(item.product_id)}
                    className="cursor-pointer"
                  >
                    <Td>{item.product_id}</Td>
                    <Td>{item.product_name}</Td>
                    <Td>
                      <Badge colorScheme={item.stock > 10 ? "green" : item.stock > 5 ? "yellow" : "red"}>
                        {item.stock != 0 ? item.stock : "-"}
                      </Badge>
                    </Td>
                    <Td>{item.avg_price ? ToMoney(item.avg_price) : "-"}</Td>
                    <Td>
                      {expandedRowId !== item.product_id ? (
                        <Icon color={"gray.500"} as={AiFillDownCircle} />
                      ) : (
                        <Icon color={"gray.500"} as={AiFillUpCircle} />
                      )}
                    </Td>
                  </Tr>
                  <Tr paddingY={0}>
                    <Td colSpan={5} padding={0} border={0} maxWidth={"500px"}>
                      <Collapse in={expandedRowId === item.product_id}>
                        <ProductDetail products={item.items} noteWidth="500px"></ProductDetail>
                      </Collapse>
                    </Td>
                  </Tr>
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
    <AddProductModal isOpen={isOpen} onClose={onClose}></AddProductModal>
    </>
  );
};

export default Product;
