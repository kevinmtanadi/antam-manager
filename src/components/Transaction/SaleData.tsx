import { useEffect, useRef, useState } from "react";

import { Input, Td, Tr } from "@chakra-ui/react";
import { GetCartData } from "../../services/dto";
import { ToMoney } from "../../services/helper";
import NumberInput from "../NumberInput";

interface Props {
  item: GetCartData;
}

const SaleData = ({ item }: Props) => {
  const [price, setPrice] = useState(0);
  const onPriceChange = (value: number) => {
    setPrice(value);
    item.buy_price = value;
  };

  return (
    <Tr key={item.product_id}>
      <Td>{item.product_id}</Td>
      <Td>{item.product_name}</Td>
      <Td>{ToMoney(item.buy_price)}</Td>
      <Td>
        <NumberInput value={price} onChangeValue={(value) => setPrice(value)} />
      </Td>
    </Tr>
  );
};

export default SaleData;
