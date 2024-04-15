import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  HStack,
  SimpleGrid,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../App";
import DateSetter from "../../components/DateSetter";
import ItemCount from "../../components/ItemCount";
import Paging from "../../components/Paging";
import TransactionDetail from "../../components/Transaction/TransactionDetail";
import { GetTransactionDataParams } from "../../services/dto";
import {
  ToMoney,
  convertDateFormat,
  generateDefaultDate,
} from "../../services/helper";

const TransactionHistory = () => {
  const api = useContext(ApiContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const today = new Date();
  const curMonth = today.getMonth();
  const curYear = today.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(curMonth);
  const { startDate, endDate } = generateDefaultDate(
    today.getFullYear(),
    today.getMonth() + 1
  );

  const [params, setParams] = useState<GetTransactionDataParams>({
    limit: 10,
    offset: 0,
    start_date: startDate,
    end_date: endDate,
  });

  const [dataCount, setDataCount] = useState(10);
  useEffect(() => {
    const { startDate, endDate } = generateDefaultDate(
      curYear,
      selectedMonth + 1
    );
    setParams({
      start_date: startDate,
      end_date: endDate,
      limit: dataCount,
      offset: 0,
    });
  }, [selectedMonth, dataCount]);

  const { data: transactionList } = api.getTransactionData(params, [params]);

  const { data: transactionCount } = api.getTransactionCount(params, [
    params.start_date,
    params.end_date,
  ]);

  const [chosenTransaction, setChosenTransaction] = useState<any>(null);

  const openModal = (item: any) => {
    setChosenTransaction(item);
    onOpen();
  };

  return (
    <>
      <VStack width={"100%"}>
        <HStack
          marginBottom={5}
          width={"100%"}
          maxW={"1000px"}
          justifyContent={"space-between"}
        >
          <VStack alignItems={"start"}>
            <Box>Data per halaman</Box>
            <ItemCount width={"100px"} onSelectCount={setDataCount} />
          </VStack>
          <VStack alignItems={"start"}>
            <Box>Periode</Box>
            <DateSetter
              selectedMonth={selectedMonth}
              onSelectMonth={setSelectedMonth}
            />
          </VStack>
        </HStack>
        <Grid
          width={"100%"}
          maxW={"1000px"}
          gap={5}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        >
          {transactionList &&
            transactionList.map((item, idx) => (
              <Card
                height={"270px"}
                marginBottom={
                  idx != transactionList.length - 1 ? "10px" : "0px"
                }
                width={"100%"}
                minWidth={"300px"}
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
                      <Box color={"blue.400"}>Total Pembelian</Box>
                      <Box fontWeight={"bold"}>
                        {item.total_buy ? ToMoney(item.total_buy) : "-"}
                      </Box>
                    </VStack>
                    <VStack spacing={0} alignItems={"start"}>
                      <Box color={"blue.400"}>Total Penjualan</Box>
                      <Box fontWeight={"bold"}>
                        {item.total_sale ? ToMoney(item.total_sale) : "-"}
                      </Box>
                    </VStack>
                    <VStack spacing={0} alignItems={"start"}>
                      <Box color={"blue.400"}>Item Dibeli</Box>
                      <Box fontWeight={"bold"}>
                        {item.purchase.length != 0 ? item.purchase.length : "-"}
                      </Box>
                    </VStack>
                    <VStack spacing={0} alignItems={"start"}>
                      <Box color={"blue.400"}>Item Terjual</Box>
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
            ))}
        </Grid>
        <Paging
          onChangePage={(page) =>
            setParams({ ...params, offset: (page - 1) * params.limit })
          }
          limit={params.limit}
          offset={params.offset}
          totalItem={transactionCount !== null ? transactionCount[0].count : 0}
        />
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
