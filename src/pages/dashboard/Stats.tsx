import {
  Box,
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../App";
import DateSetter from "../../components/DateSetter";
import SummaryChart from "../../components/SummaryChart";
import { DateParams } from "../../services/dto";
import { ToMoney, generateDefaultDate } from "../../services/helper";

const Stats = () => {
  const api = useContext(ApiContext);

  const today = new Date();
  const curMonth = today.getMonth();
  const curYear = today.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(curMonth);
  const { startDate, endDate } = generateDefaultDate(
    curYear,
    selectedMonth + 1
  );
  const [dateParams, setDateParams] = useState<DateParams>({
    start_date: startDate,
    end_date: endDate,
  } as DateParams);

  useEffect(() => {
    const { startDate, endDate } = generateDefaultDate(
      curYear,
      selectedMonth + 1
    );
    setDateParams({ start_date: startDate, end_date: endDate } as DateParams);
  }, [selectedMonth]);

  const { data: graphData } = api.getTransactionGraph(dateParams, [dateParams]);
  const { data: dashboardData } = api.getDashboardData(dateParams, [
    dateParams,
  ]);
  const { data: stockValue } = api.getStockValue();

  return (
    <>
      <Center>
        <Grid
          width={"100%"}
          maxWidth={"1000px"}
          templateColumns={{ xl: "1fr 1fr 1fr 1fr", base: "1fr 1fr" }}
          templateAreas={{
            xl: `
        "title mt mt date"
        "box-1 box-2 graph graph"
        "box-3 box-4 graph graph"
        "box-5 box-6 box-7 box-8"
        `,
            base: `
        "title date"
        "graph graph"
        "box-1 box-2"
        "box-3 box-4"
        "box-5 box-6"
        "box-7 box-8"
          `,
          }}
          gap={4}
        >
          <GridItem area={"title"}>
            <Box fontSize={"1.3rem"} fontWeight={"semibold"}>
              Dashboard
            </Box>
            <Box className="font-gray">Analytic details</Box>
          </GridItem>
          <GridItem area={"date"}>
            <Box marginBottom={5}>
              <DateSetter
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
              />
            </Box>
          </GridItem>
          <GridItem area={"box-1"}>
            <Card height={"100%"}>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1 font-gray font-gray">
                    Profit
                  </StatLabel>
                  <HStack>
                    <StatNumber className="display-text-2">
                      {dashboardData && ToMoney(dashboardData[0].profit)}
                    </StatNumber>
                    {dashboardData && dashboardData[0].profit != 0 ? (
                      <StatArrow
                        type={
                          dashboardData && dashboardData[0].profit > 0
                            ? "increase"
                            : "decrease"
                        }
                      />
                    ) : (
                      ""
                    )}
                  </HStack>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"box-2"}>
            <Card height={"100%"}>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1 font-gray">
                    Total Item Terjual
                  </StatLabel>
                  <StatNumber className="display-text-2">
                    {dashboardData ? dashboardData[0].amount_sold : 0}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"box-3"}>
            <Card height={"100%"}>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1 font-gray">
                    Total Penjualan
                  </StatLabel>
                  <StatNumber className="display-text-2">
                    {dashboardData && ToMoney(dashboardData[0].total_sale)}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"box-4"}>
            <Card height={"100%"}>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1 font-gray">
                    Total Pembelian
                  </StatLabel>
                  <StatNumber className="display-text-2">
                    {dashboardData && ToMoney(dashboardData[0].total_buy)}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"graph"}>
            <Card>
              <CardBody>
                <SummaryChart data={graphData} month={selectedMonth} />
              </CardBody>
            </Card>
          </GridItem>

          <GridItem area={"box-5"}>
            <Card height={"100%"}>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1 font-gray">
                    Barang Paling Laku
                  </StatLabel>
                  <HStack>
                    <StatNumber className="display-text-2" marginRight={1}>
                      {dashboardData ? dashboardData[0].top_sold_product : "-"}
                    </StatNumber>
                    <StatHelpText
                      className="display-text-1 font-gray"
                      marginBottom={0}
                    >
                      {dashboardData && dashboardData[0].amount_sold > 0
                        ? "Terjual " + dashboardData[0].amount_sold
                        : "-"}
                    </StatHelpText>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"box-6"}>
            <Card height={"100%"}>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1 font-gray">
                    Nilai Stok
                  </StatLabel>
                  <StatNumber className="display-text-2">
                    {stockValue && ToMoney(stockValue[0].count)}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Center>
    </>
  );
};

export default Stats;
