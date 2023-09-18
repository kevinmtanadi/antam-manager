import { useEffect, useRef, useState } from "react";

import { Box, Input, Td, Tr, VStack } from "@chakra-ui/react";
import { GetCartData } from "../../services/dto";
import { ToMoney } from "../../services/helper";
import NumberInput from "../NumberInput";

interface Props {
  item: GetCartData;
  showFull: boolean;
}

const SaleData = ({ item, showFull }: Props) => {
  const [price, setPrice] = useState(0);
  const onPriceChange = (value: number) => {
    setPrice(value);
    item.buy_price = value;
  };

  if (showFull) return (
    <Tr>
      <Td>{item.product_id}</Td>
      <Td>{item.product_name}</Td>
      <Td>{ToMoney(item.buy_price)}</Td>
      <Td>
        <NumberInput value={price} onChangeValue={(value) => setPrice(value)} />
      </Td>
    </Tr>
  );
  
  return (
    <Tr>
      <Td>
        <VStack>
          <Box>{item.product_stock_id}</Box>
          <Box>{item.product_name}</Box>
        </VStack>
      </Td>
      <Td>
        <VStack>
          <Box>{item.buy_price}</Box>
          <Box><NumberInput value={price} onChangeValue={(value) => setPrice(value)} /></Box>
        </VStack>
      </Td>
    </Tr>
  );
};

export default SaleData;
