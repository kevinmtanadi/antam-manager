import { useContext, useState } from "react";

import { Box, Td, Tr, VStack, useToast } from "@chakra-ui/react";
import { GetCartData } from "../../services/dto";
import { ToMoney } from "../../services/helper";
import NumberInput from "../NumberInput";
import { CloseIcon } from "@chakra-ui/icons";
import { ApiContext } from "../../App";
import { CanceledError } from "axios";

interface Props {
  item: GetCartData;
  showFull: boolean;
  onRemoveCart: (id: string) => void;
}

const SaleData = ({ item, showFull, onRemoveCart }: Props) => {
  const [price, setPrice] = useState(0);

  const changePrice = (value: number) => {
    setPrice(value);
    item.sale_price = value;
  };

  if (showFull)
    return (
      <Tr>
        <Td>{item.product_stock_id}</Td>
        <Td>{item.product_id}</Td>
        <Td>{item.product_name}</Td>
        <Td>{ToMoney(item.buy_price)}</Td>
        <Td>
          <NumberInput
            value={price}
            onChangeValue={(value) => changePrice(value)}
          />
        </Td>
        <Td>
          <CloseIcon
            fontSize={"0.8rem"}
            className="cursor-pointer"
            color={"red.300"}
            onClick={() => onRemoveCart(item.product_stock_id)}
          />
        </Td>
      </Tr>
    );

  return (
    <Tr>
      <Td>
        <VStack>
          <Box fontWeight={"semibold"}>{item.product_stock_id}</Box>
          <Box>{item.product_name}</Box>
        </VStack>
      </Td>
      <Td>
        <VStack>
          <Box>{item.buy_price}</Box>
          <Box>
            <NumberInput
              value={price}
              onChangeValue={(value) => changePrice(value)}
            />
          </Box>
        </VStack>
      </Td>
      <Td>
        <CloseIcon
          fontSize={"0.8rem"}
          className="cursor-pointer"
          color={"red.300"}
          onClick={() => onRemoveCart(item.product_stock_id)}
        />
      </Td>
    </Tr>
  );
};

export default SaleData;
