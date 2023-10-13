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
          maxWidth={"1000px"}
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          <GridItem colSpan={{ base: 2, md: 3, lg: 3, xl: 4 }}>
            <Box marginBottom={5}>
              <DateSetter
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
              />
            </Box>
            <SummaryChart data={graphData} month={selectedMonth} />
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1">Profit</StatLabel>
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
          <GridItem>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1">
                    Total Item Terjual
                  </StatLabel>
                  <StatNumber className="display-text-2">
                    {dashboardData ? dashboardData[0].amount_sold : 0}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1">
                    Total Penjualan
                  </StatLabel>
                  <StatNumber className="display-text-2">
                    {dashboardData && ToMoney(dashboardData[0].total_sale)}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1">
                    Total Pembelian
                  </StatLabel>
                  <StatNumber className="display-text-2">
                    {dashboardData && ToMoney(dashboardData[0].total_buy)}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1">
                    Barang Paling Laku
                  </StatLabel>
                  <HStack>
                    <StatNumber className="display-text-2" marginRight={1}>
                      {dashboardData ? dashboardData[0].top_sold_product : "-"}
                    </StatNumber>
                    <StatHelpText className="display-text-1" marginBottom={0}>
                      {dashboardData && dashboardData[0].amount_sold > 0
                        ? "Terjual " + dashboardData[0].amount_sold
                        : "-"}
                    </StatHelpText>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel className="display-text-1">Nilai Stok</StatLabel>
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
