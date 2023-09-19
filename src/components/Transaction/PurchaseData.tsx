import { useState } from "react";

import { Box, Td, Tr, VStack } from "@chakra-ui/react";
import { PurchaseItem } from "../../pages/dashboard/Transaction";
import NumberInput from "../NumberInput";
import { CloseIcon } from "@chakra-ui/icons";

interface Props {
  item: PurchaseItem;
  showFull: boolean;
  onRemove: (id: string) => void;
}

const PurchaseData = ({ item, showFull, onRemove }: Props) => {
  const [price, setPrice] = useState(item.buy_price);
  const onPriceChange = (value: number) => {
    setPrice(value);
    item.buy_price = value;
  };

  if (showFull)
    return (
      <Tr>
        <Td>{item.product_stock_id}</Td>
        <Td>{item.product_id}</Td>
        <Td>{item.product_name}</Td>
        <Td>
          <NumberInput
            value={price}
            onChangeValue={(value) => onPriceChange(value)}
          />
        </Td>
        <Td>
          <CloseIcon
            fontSize={"0.8rem"}
            className="cursor-pointer"
            color={"red.300"}
            onClick={() => onRemove(item.product_stock_id)}
          />
        </Td>
      </Tr>
    );

  return (
    <Tr>
      <Td>
        <VStack>
          <Box fontWeight={"semibold"}>{item.product_stock_id}</Box>
          <Box>
            {item.product_id} - {item.product_name}
          </Box>
        </VStack>
      </Td>
      <Td>
        <VStack>
          <Box></Box>
          <Box>
            <NumberInput
              value={price}
              onChangeValue={(value) => onPriceChange(value)}
            />
          </Box>
        </VStack>
      </Td>
      <Td>
        <CloseIcon
          fontSize={"0.8rem"}
          className="cursor-pointer"
          color={"red.300"}
          onClick={() => onRemove(item.product_stock_id)}
        />
      </Td>
    </Tr>
  );
};

export default PurchaseData;
