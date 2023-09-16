import { Card, CardBody } from "@chakra-ui/react";
import { useState } from "react";
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
