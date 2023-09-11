import { Card, CardBody, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useState } from "react";
import { ToMoney, convertGoldPriceToIdr } from "../../services/helper";

const Stats = () => {
  const [data, setData] = useState<any>();

  return (
    <>
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>Kurs Emas</StatLabel>
            <StatNumber>{data ? ToMoney(convertGoldPriceToIdr(data?.price)) : "-"}</StatNumber>

          </Stat>
        </CardBody>
      </Card>
    </>
  );
};

export default Stats;
