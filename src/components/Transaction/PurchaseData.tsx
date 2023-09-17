import { useEffect, useRef, useState } from "react";

import { Icon, Input, Td, Tr } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { PurchaseItem } from "../../pages/dashboard/Transaction";
import { ToMoney } from "../../services/helper";
import NumberInput from "../NumberInput";

interface Props {
  item: PurchaseItem;
}

const PurchaseData = ({ item }: Props) => {
  const [price, setPrice] = useState(item.buy_price);
  const onPriceChange = (value: number) => {
    setPrice(value);
    item.buy_price = value;
  };

  return (
    <Tr key={item.product_id}>
      <Td>{item.product_id}</Td>
      <Td>{item.product_name}</Td>
      <Td>{item.product_stock_id}</Td>
      <Td>
        <NumberInput
          value={price}
          onChangeValue={(value) => onPriceChange(value)}
        />
      </Td>
    </Tr>
  );
};

export default PurchaseData;
