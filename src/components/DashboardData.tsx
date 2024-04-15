import { HStack } from "@chakra-ui/layout";
import { Stat, StatLabel, StatNumber, StatArrow } from "@chakra-ui/stat";
import { ToMoney } from "../services/helper";

interface Props {
  label?: string;
  data?: number | null;
  showArrow?: boolean;
  isNotMoney?: boolean;
}

const DashboardData = ({ label, data, showArrow, isNotMoney }: Props) => {
  return (
    <Stat>
      <StatLabel className="display-text-1 font-gray font-gray">
        {label}
      </StatLabel>
      <HStack>
        <StatNumber className="display-text-2">
          {isNotMoney ? data : data && ToMoney(data)}
        </StatNumber>
        {showArrow && data && data != 0 ? (
          <StatArrow type={data && data > 0 ? "increase" : "decrease"} />
        ) : (
          ""
        )}
      </HStack>
    </Stat>
  );
};

export default DashboardData;
