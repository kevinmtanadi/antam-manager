import { Box, Card, CardBody, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { goldApiContext } from "../../App";
import { ToMoney, convertGoldPriceToIdr } from "../../services/helper";

interface goldResponse {
  price: number;
}

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
