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
  useToast,
} from "@chakra-ui/react";
import { CanceledError } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ApiContext } from "../../App";
import AddProductModal from "../../components/Product/AddProductModal";
import ProductDetail from "../../components/Product/ProductDetail";
import {
  GetProductDataParams,
  InsertProductData,
  ProductData,
  ProductStockData,
} from "../../services/dto";
import { ToMoney } from "../../services/helper";

const Product = () => {
  const api = useContext(ApiContext);

  const [params, setParams] = useState<GetProductDataParams>({
    limit: 10,
    offset: 0,
  });

  const [call, setCall] = useState(0);

  const toast = useToast();

  const {
    data: productList,
    message,
    error,
    status,
    isLoading,
  } = api.getProductData(params, [params, call]);

  useEffect(() => {
    setShownProduct(productList);
    setProduct(productList);
  }, [productList]);

  const [shownProduct, setShownProduct] = useState<ProductData[] | null>(
    productList
  );

  const [product, setProduct] = useState<ProductData[] | null>(productList);

  const searchRef = useRef<HTMLInputElement>(null);
  const setRef = () => {
    if (searchRef.current) {
      if (!product) return;

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

  const [chosenProduct, setChosenProduct] = useState<ProductData | null>(null);
  const resetProductDetail = () => {
    if (!product || !chosenProduct) return;
    const currentChosenProduct = product.filter(
      (item) => item.product_id === chosenProduct.product_id
    )[0];
    setChosenProduct(currentChosenProduct);
  };

  const openModal = (item: ProductData) => {
    setChosenProduct(item);
    onOpen();
  };

  const onAddCart = (prod: ProductStockData) => {
    api
      .insertCartData(prod.product_stock_id)
      ?.then(() => {
        setCall(call + 1);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: "Gagal menambahkan produk ke keranjang",
          status: "error",
          description: err,
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const onRemoveCart = (prod: ProductStockData) => {
    api
      .deleteCartData(prod.product_stock_id)
      ?.then(() => {
        setCall(call + 1);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: "Gagal menghapus produk dari keranjang",
          status: "error",
          description: err,
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const onCreateProduct = (product: InsertProductData) => {
    api
      .createNewProduct(product)
      ?.then((res) => {
        toast({
          title: "Berhasil menambahkan produk baru",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCall(call + 1);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: "Gagal menambahkan produk baru",
          status: "error",
          description: err,
          duration: 5000,
          isClosable: true,
        });
      });
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
        <Button className="display-text-1" onClick={() => onCreateOpen()} colorScheme="whatsapp">
          Tambah Produk
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
        {shownProduct &&
          shownProduct.map((item) => (
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
        onAddCart={(item: ProductStockData) => onAddCart(item)}
        onRemoveCart={(item: ProductStockData) => onRemoveCart(item)}
      />
      <AddProductModal
        onSubmit={(product) => onCreateProduct(product)}
        isOpen={isCreateOpen}
        onClose={onCreateClose}
      />
    </>
  );
};

export default Product;
