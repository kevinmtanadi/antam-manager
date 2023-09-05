import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import AddProductModal from "../../components/Product/AddProductModal";
import ProductDetail from "../../components/Product/ProductDetail";
import { ToMoney } from "../../services/helper";
import { BsSearch } from "react-icons/bs";

interface Product {
  product_id: string;
  product_name: string;
  weight: number;
  stock: number;
  avg_price: number;
  items: Item[];
}

interface Item {
  product_stock_id: string;
  product_id: string | null;
  product_name: string | null;
  buy_price: number;
  buy_at: string;
  note: string;
}

const products = [
  {
    product_id: "",
    product_name: "",
    weight: 0,
    stock: 0,
    avg_price: 0,
    items: [],
  },
  {
    product_id: "AT1",
    product_name: "Antam 1gr",
    weight: 1,
    stock: 2,
    avg_price: 1038000,
    items: [
      {
        product_stock_id: "2",
        product_id: null,
        product_name: null,
        buy_price: 1076000,
        buy_at: "2023-09-01 16:46:24",
        note: "test",
      },
      {
        product_stock_id: "4",
        product_id: null,
        product_name: null,
        buy_price: 1000000,
        buy_at: "2023-09-01 18:21:24",
        note: "",
      },
    ],
  },
  {
    product_id: "AT10",
    product_name: "Antam 10gr",
    weight: 10,
    stock: 0,
    avg_price: 0,
    items: [],
  },
  {
    product_id: "AT100",
    product_name: "Antam 100gr",
    weight: 100,
    stock: 0,
    avg_price: 0,
    items: [],
  },
  {
    product_id: "AT5",
    product_name: "Antam 5gr",
    weight: 5,
    stock: 0,
    avg_price: 0,
    items: [],
  },
  {
    product_id: "AT50",
    product_name: "Antam 50gr",
    weight: 50,
    stock: 0,
    avg_price: 0,
    items: [],
  },
  {
    product_id: "UBS1",
    product_name: "UBS 1gr",
    weight: 1,
    stock: 0,
    avg_price: 0,
    items: [],
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

  const [shownProduct, setShownProduct] = useState<Product[]>(products);

  const searchRef = useRef<HTMLInputElement>(null);
  const setRef = () => {
    if (searchRef.current) {
      const filteredProduct = products.filter((item) => {
        const query = searchRef.current ? searchRef.current.value : "";
        const queryRegex = new RegExp(query.replace(/\*/g, ".*"), "i");

        return (
          item.product_id.match(queryRegex) ||
          item.product_name.match(queryRegex)
        );
      });

      setShownProduct(filteredProduct);
    }
  };

  useEffect(() => {}, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack marginBottom={3} width={"100%"} justifyContent={"space-between"}>
        <Box>
          <form
            onChange={() => {
              setRef();
            }}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <InputGroup>
              <InputLeftElement children={<BsSearch />} />
              <Input ref={searchRef} placeholder="Cari produk" />
            </InputGroup>
          </form>
        </Box>
        <Button onClick={() => onOpen()} colorScheme="whatsapp">
          Tambahkan Produk Baru
        </Button>
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
                  <Th>Harga/gr</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {shownProduct.map((item) => (
                  <React.Fragment key={item.product_id}>
                    <Tr
                      onClick={() => toggleRow(item.product_id)}
                      className="cursor-pointer"
                    >
                      <Td>{item.product_id}</Td>
                      <Td>{item.product_name}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            item.stock > 10
                              ? "green"
                              : item.stock > 5
                              ? "yellow"
                              : "red"
                          }
                        >
                          {item.stock != 0 ? item.stock : "-"}
                        </Badge>
                      </Td>
                      <Td>{item.avg_price ? ToMoney(item.avg_price) : "-"}</Td>
                      <Td>
                        {item.avg_price
                          ? ToMoney(item.avg_price / item.weight)
                          : "-"}
                      </Td>
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
                          <ProductDetail
                            products={item.items}
                            noteWidth="500px"
                          ></ProductDetail>
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
