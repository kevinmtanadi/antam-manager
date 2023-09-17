import { Box } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { GraphData } from "../services/dto";
import { ShortenDate } from "../services/helper";

interface Props {
  data?: GraphData[] | null;
  month: number;
}

const SummaryChart = ({ data, month }: Props) => {
  const generateEmptyData = (year: number, month: number) => {
    const monthData = [];
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= lastDayOfMonth; day++) {
      const date = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const existingData = data?.find((item) => item.date.toString() === date);

      if (existingData) {
        monthData.push({
          date: ShortenDate(existingData.date.toString()),
          purchase: existingData.total_purchase,
          sale: existingData.total_sale,
          transaction_count: existingData.transaction_count,
        });
      } else {
        monthData.push({
          date: ShortenDate(date),
          purchase: 0,
          sale: 0,
          transaction_count: 0,
        });
      }
    }

    return monthData;
  };

  const year = new Date().getFullYear();
  const totalData = generateEmptyData(year, month + 1);
  return (
    <Box maxW={{ base: "800px", lg: "650px", xl: "1000px" }}>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart data={totalData} height={250}>
          <CartesianGrid strokeDasharray="10 3" />
          <XAxis dataKey="date" interval={6} />
          <YAxis />
          <Tooltip />
          <Line
            dot={false}
            type="monotone"
            name="Jumlah transaksi"
            dataKey="transaction_count"
            stroke="#D4342A"
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SummaryChart;
