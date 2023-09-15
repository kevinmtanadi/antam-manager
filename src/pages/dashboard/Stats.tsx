import { Card, CardBody, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ToMoney, convertGoldPriceToIdr } from "../../services/helper";
import NumberInput from "../../components/NumberInput";

const Stats = () => {
  const [data, setData] = useState(0);

  const onSetValue = (value: number) => {
    setData(value);
  };
  
  return (
    <>
      <Card>
        <CardBody>
          <NumberInput
            value={data}
            onChangeValue={(value: number) => onSetValue(value)}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Stats;
