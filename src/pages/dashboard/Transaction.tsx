import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Show,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CancelledError } from "react-query";
import { ApiContext } from "../../App";
import AddPurchase from "../../components/Transaction/AddPurchase";
import AddSale from "../../components/Transaction/AddSale";
import PurchaseData from "../../components/Transaction/PurchaseData";
import SaleData from "../../components/Transaction/SaleData";
import {
  InsertTransactionData,
  TransactionPurchaseData,
  TransactionSaleData,
} from "../../services/dto";

export interface PurchaseItem {
  product_id: string;
  product_stock_id: string;
  product_name: string;
  buy_price: number;
  note?: string;
}

const Transaction = () => {
  const api = useContext(ApiContext);
  const [call, setCall] = useState(0);

  const { data: salesItems } = api.getCartData([call]);
  const toast = useToast();

  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[] | null>(
    null
  );

  const {
    isOpen: isAddPurchaseOpen,
    onOpen: onAddPurchaseOpen,
    onClose: onAddPurchaseClose,
  } = useDisclosure();
  const {
    isOpen: isAddSaleOpen,
    onOpen: onAddSaleOpen,
    onClose: onAddSaleClose,
  } = useDisclosure();

  const addPurchaseItem = (
    product_id: string,
    product_stock_id: string,
    product_name: string,
    buy_price: number
  ) => {
    const item = {
      product_id: product_id,
      product_stock_id,
      product_name,
      buy_price,
    };
    if (purchaseItems) {
      setPurchaseItems([...purchaseItems, item]);
    } else {
      setPurchaseItems([item]);
    }
  };


  const addSaleItem = (product_stock_id: string) => {
    api.insertCartData(product_stock_id)?.then((res) => {
      console.log(res);
      setCall(call + 1);
    });
  };

  const finalizeTransaction = () => {
    var purchase: TransactionPurchaseData[] = [];
    if (purchaseItems) {
      purchaseItems.forEach((item) => {
        purchase = [
          ...purchase,
          {
            product_id: item.product_id,
            product_stock_id: item.product_stock_id,
            product_name: item.product_name,
            buy_price: item.buy_price,
            note: item.note,
          },
        ];
      });
    }

    var sales: TransactionSaleData[] = [];
    if (salesItems) {
      salesItems.forEach((item) => {
        sales = [
          ...sales,
          {
            product_stock_id: item.product_stock_id,
            product_name: item.product_name,
            buy_price: item.buy_price,
            sale_price: item.sale_price ? item.sale_price : 0,
          },
        ];
      });
    }

    const transactionData: InsertTransactionData = {
      purchase: purchase,
      sales: sales,
    };

    api
      .createNewTransaction(transactionData)
      ?.then((res) => {
        const data = res.data;
        switch (data.status) {
          case 200:
            toast({
              title: "Transaksi Berhasil",
              description: "Transaksi Berhasil",
              status: "success",
              duration: 6000,
              isClosable: true,
            });
            break;
          default:
            toast({
              title: "Transaksi Gagal",
              description: data.message,
              status: "error",
              duration: 6000,
              isClosable: true,
            });
        }
        setCall(call + 1);
        setPurchaseItems([]);
      })
      .catch((err) => {
        if (err instanceof CancelledError) return;
        toast({
          title: "Transaksi Gagal",
          description: err.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
    console.log(transactionData);
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, xxl: 2 }} spacing={5}>
        <Card>
          <CardHeader
            textAlign={"center"}
            fontWeight={"semibold"}
            fontSize={"1.1rem"}
          >
            JUAL
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table size={"sm"}>
                <Tbody>
                  <Show above="md">
                    <Tr>
                      <Th>No. Serial</Th>
                      <Th>Kode Produk</Th>
                      <Th>Nama Produk</Th>
                      <Th>Harga Beli</Th>
                      <Th>Harga Jual</Th>
                    </Tr>
                    {salesItems?.map((item, idx) => (
                      <SaleData key={idx} item={item} showFull={true}/>
                    ))}
                  </Show>
                  <Show below="md">
                    {salesItems?.map((item, idx) => (
                      <SaleData key={idx} item={item} showFull={false}/>
                    ))}
                  </Show>
                    <Tr>
                      <Td
                        height={"40px"}
                        className="cursor-pointer"
                        onClick={() => onAddSaleOpen()}
                        colSpan={5}
                      >
                        <Center fontSize="1.25rem">+</Center>
                      </Td>
                    </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            textAlign={"center"}
            fontWeight={"semibold"}
            fontSize={"1.1rem"}
          >
            BELI
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table size={"sm"}>
                <Tbody>
                  <Show above="md">
                    <Tr>
                      <Th>No. Serial</Th>
                      <Th>Kode Produk</Th>
                      <Th>Nama Produk</Th>
                      <Th>Harga Beli</Th>
                    </Tr>
                    {purchaseItems?.map((item, idx) => (
                      <PurchaseData item={item} key={idx} showFull={true} />
                    ))}
                  </Show>
                  <Show below="md">
                    {purchaseItems?.map((item, idx) => (
                      <PurchaseData item={item} key={idx} showFull={false} />
                    ))}
                  </Show>
                  <Tr>
                    <Td
                      height={"40px"}
                      className="cursor-pointer"
                      onClick={() => onAddPurchaseOpen()}
                      colSpan={4}
                    >
                      <Center fontSize="1.25rem">+</Center>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Center marginTop={5}>
        <Button onClick={() => finalizeTransaction()} colorScheme="whatsapp">
          Selesaikan Transaksi
        </Button>
      </Center>
      <AddPurchase
        isOpen={isAddPurchaseOpen}
        onClose={onAddPurchaseClose}
        onSubmit={(product_id, product_stock_id, product_name, buy_price) =>
          addPurchaseItem(product_id, product_stock_id, product_name, buy_price)
        }
      />
      <AddSale
        isOpen={isAddSaleOpen}
        onClose={onAddSaleClose}
        onSubmit={(product_stock_id) => addSaleItem(product_stock_id)}
      />
    </>
  );
}

export default Transaction;
