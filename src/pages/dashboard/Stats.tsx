import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Grid,
  GridItem,
  HStack,
  Stat,
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
import DashboardData from "../../components/DashboardData";

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
                <DashboardData
                  label="Profit"
                  data={dashboardData ? dashboardData[0].profit : 0}
                  showArrow={true}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"box-2"}>
            <Card height={"100%"}>
              <CardBody>
                <DashboardData
                  label="Total Item Terjual"
                  data={dashboardData ? dashboardData[0].amount_sold : 0}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"box-3"}>
            <Card height={"100%"}>
              <CardBody>
                <DashboardData
                  label="Total Penjualan"
                  data={dashboardData ? dashboardData[0].total_sale : 0}
                />
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
            <Card padding={3}>
              <CardHeader fontSize={"1.25rem"}>Transaksi Bulan Ini</CardHeader>
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
                    {dashboardData && dashboardData[0].amount_sold > 0 ? (
                      <>
                        <StatNumber className="display-text-2" marginRight={1}>
                          {dashboardData
                            ? dashboardData[0].top_sold_product
                            : "-"}
                        </StatNumber>
                        <StatHelpText
                          className="display-text-1"
                          fontSize={"1.3rem"}
                          fontWeight={"bold"}
                          marginBottom={0}
                        >
                          {"Terjual " + dashboardData[0].amount_sold}
                        </StatHelpText>
                      </>
                    ) : (
                      <StatHelpText
                        className="display-text-1"
                        fontSize={"1.2rem"}
                        fontWeight={"bold"}
                        marginBottom={0}
                      >
                        Tidak ada penjualan
                      </StatHelpText>
                    )}
                  </HStack>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem area={"box-6"}>
            <Card height={"100%"}>
              <CardBody>
                <DashboardData
                  label="Nilai Stok"
                  data={stockValue ? stockValue[0].count : 0}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Center>
    </>
  );
};

export default Stats;
