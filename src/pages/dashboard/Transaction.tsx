import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Icon,
  Input,
  SimpleGrid,
  Table,
  TableContainer,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../App";
import AddPurchase from "../../components/Transaction/AddPurchase";
import { ToMoney } from "../../services/helper";
import AddSale from "../../components/Transaction/AddSale";
import { BsPencilSquare } from "react-icons/bs";

interface PurchaseItem {
  product_id: string;
  product_name: string;
  buy_price: number;
  note?: string;
}

const Transaction = () => {
  const api = useContext(ApiContext);
  const { data } = api.getCartData();
  useEffect(() => {
    console.log(data);
  }, [data]);

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
    product_name: string,
    buy_price: number
  ) => {
    const item = {
      product_id: product_id,
      product_name,
      buy_price,
    };
    if (purchaseItems) {
      setPurchaseItems([...purchaseItems, item]);
    } else {
      setPurchaseItems([item]);
    }
  };

  return (
    <>
      <SimpleGrid columns={2} spacing={5}>
        <Card>
          <CardHeader>JUAL</CardHeader>
          <CardBody>
            <TableContainer>
              <Table size={"sm"}>
                {data?.map((item, idx) => (
                  <Tr key={idx}>
                    <Td>{item.product_stock_id}</Td>
                    <Td>{item.product_name}</Td>
                    <Td>{ToMoney(item.buy_price)}</Td>
                    <Td>
                      <Input />
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td
                    height={"40px"}
                    className="cursor-pointer"
                    onClick={() => onAddSaleOpen()}
                    colSpan={4}
                  >
                    <Center>+</Center>
                  </Td>
                </Tr>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>BELI</CardHeader>
          <CardBody>
            <TableContainer>
              <Table size={"sm"}>
                {purchaseItems?.map((item) => (
                  <Tr key={item.product_id}>
                    <Td>{item.product_name}</Td>
                    <Td>{ToMoney(item.buy_price)}</Td>
                    <Td>
                      <Icon as={BsPencilSquare} className="cursor-pointer" />
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td
                    height={"40px"}
                    className="cursor-pointer"
                    onClick={() => onAddPurchaseOpen()}
                    colSpan={3}
                  >
                    <Center>+</Center>
                  </Td>
                </Tr>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </SimpleGrid>
      <AddPurchase
        isOpen={isAddPurchaseOpen}
        onClose={onAddPurchaseClose}
        onSubmit={(product_id, product_name, buy_price) =>
          addPurchaseItem(product_id, product_name, buy_price)
        }
      />
      <AddSale isOpen={isAddSaleOpen} onClose={onAddSaleClose} />
    </>
  );
};

export default Transaction;
