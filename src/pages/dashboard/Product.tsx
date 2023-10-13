import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
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
  EditProductData,
  GetProductDataParams,
  InsertProductData,
  ProductData,
  ProductStockData,
} from "../../services/dto";
import { ToMoney } from "../../services/helper";
import { BiPencil } from "react-icons/bi"
import { BsFillTrashFill } from "react-icons/bs"
import EditProductModal from "../../components/Product/EditProductModal";
import DeleteProductModal from "../../components/Product/DeleteProductModal";

const Product = () => {
  const api = useContext(ApiContext);

  const [params] = useState<GetProductDataParams>({
    limit: 999,
    offset: 0,
  });

  const [call, setCall] = useState(0);

  const toast = useToast();

  const { data: productList } = api.getProductData(params, [params, call]);

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
  
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
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
  
  const openEditModal = (item:ProductData) => {
    setChosenProduct(item);
    onEditOpen();
  }
  
  const openDeleteModal = (item:ProductData) => {
    setChosenProduct(item);
    onDeleteOpen();
  }

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
      ?.then(() => {
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
  
  const onEditProduct = (product: EditProductData) => {
    api
      .editProduct(product)
      ?.then(() => {
        toast({
          title: "Berhasil mengedit produk",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCall(call + 1);
      }).catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: "Gagal mengedit produk",
          status: "error",
          description: err,
          duration: 5000,
          isClosable: true,
        });
      })
  }
  
  const onDeleteProduct = (productId: string) => {
    api
      .deleteProduct(productId)
      ?.then(() => {
        toast({
          title: "Berhasil menghapus produk",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCall(call + 1);
      }).catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: "Gagal menghapus produk",
          status: "error",
          description: err,
          duration: 5000,
          isClosable: true,
        });
      })
  }

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
        <Button
          className="display-text-1"
          onClick={() => onCreateOpen()}
          colorScheme="whatsapp"
        >
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
                  <HStack justifyContent={'space-between'}>
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
                    <HStack spacing={4}>
                      <Icon as={BiPencil} color={"blue.400"} onClick={() => openEditModal(item)} className="cursor-pointer"/>
                      <Icon as={BsFillTrashFill} color={"red.400"} onClick={() => openDeleteModal(item)} className="cursor-pointer"/>
                    </HStack>
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
                    <VStack spacing={0} alignItems={"start"}>
                      <Box>Total Stok</Box>
                      <Box fontWeight={'semibold'}>
                        {item.total_stock ? ToMoney(item.total_stock) : "-"}
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
      <EditProductModal
        product={chosenProduct}
        isOpen={isEditOpen}
        onSubmit={(product) => onEditProduct(product)}
        onClose={onEditClose}
      />
      <DeleteProductModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onSubmit={(productId) => onDeleteProduct(productId)}
        productId={chosenProduct ? chosenProduct.product_id : ""}
        />
    </>
  );
};

export default Product;
