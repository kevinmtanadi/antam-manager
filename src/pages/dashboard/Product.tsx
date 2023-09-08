import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import AddProductModal from "../../components/Product/AddProductModal";
import ProductDetail from "../../components/Product/ProductDetail";
import { ToMoney } from "../../services/helper";
import { useCart } from "../../context/CartContext";

export interface Product {
  product_id: string;
  product_name: string;
  weight: number;
  stock: number;
  avg_price: number;
  items: Item[];
}

export interface Item {
  product_stock_id: string;
  product_id: string | null;
  product_name: string | null;
  buy_price: number;
  buy_at: string;
  note: string;
}

const productList = [
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
  const [shownProduct, setShownProduct] = useState<Product[]>(productList);

  const [product, setProduct] = useState<Product[]>(productList);

  const searchRef = useRef<HTMLInputElement>(null);
  const setRef = () => {
    if (searchRef.current) {
      const filteredProduct = product.filter((item) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const [chosenProduct, setChosenProduct] = useState<Product>(product[0]);
  const resetProductDetail = () => {
    const currentChosenProduct = product.filter(
      (item) => item.product_id === chosenProduct.product_id
    )[0];
    setChosenProduct(currentChosenProduct);
  };

  const openModal = (item: Product) => {
    setChosenProduct(item);
    onOpen();
  };

  const { addItemToCart } = useCart();

  const onAddCart = (prod: Item, product_id: string) => {
    addItemToCart(prod);

    const updatedProducts = product.map((item) => {
      if (item.product_id === product_id) {
        const updatedItem = item.items.filter((item) => item !== prod);

        return {
          ...item,
          items: updatedItem,
        };
      }

      return item;
    });

    setProduct(updatedProducts);
  };

  useEffect(() => {
    setRef();
    resetProductDetail();
  }, [product]);

  return (
    <>
      <HStack marginBottom={5} width={"100%"} justifyContent={"space-between"}>
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
        <Button onClick={() => onCreateOpen()} colorScheme="whatsapp">
          Tambahkan Produk Baru
        </Button>
      </HStack>

      <Grid
        gap={5}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
      >
        {shownProduct.map((item) => (
          <GridItem key={item.product_id}>
            <Card>
              <CardBody>
                <HStack>
                  <Box
                    color={"blue.500"}
                    fontWeight={"semibold"}
                    fontSize={"1rem"}
                  >
                    {item.product_id}
                  </Box>
                  <Box>{item.product_name}</Box>
                </HStack>
                <Divider marginY={3} />
                <SimpleGrid columns={2}>
                  <VStack spacing={0} alignItems={"start"}>
                    <Box>Jumlah Item</Box>
                    <Box fontWeight={"semibold"}>
                      {item.stock > 0 ? item.stock : "-"}
                    </Box>
                  </VStack>
                  <VStack spacing={0} alignItems={"start"}>
                    <Box>Harga Avg</Box>
                    <Box fontWeight={"semibold"}>
                      {item.avg_price ? ToMoney(item.avg_price) : "-"}
                    </Box>
                  </VStack>
                  <VStack spacing={0} alignItems={"start"}>
                    <Box>Berat</Box>
                    <Box fontWeight={"semibold"}>
                      {item.weight ? item.weight + " g" : "-"}
                    </Box>
                  </VStack>
                </SimpleGrid>
                <Divider marginY={3} />

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
          </GridItem>
        ))}
      </Grid>
      <ProductDetail
        isOpen={isOpen}
        onClose={onClose}
        product={chosenProduct}
        onAddCart={(item, product_id) => onAddCart(item, product_id)}
      />
      <AddProductModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </>
  );
};

export default Product;
