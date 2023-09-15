import { useEffect, useRef, useState } from "react";

import { Input, Td, Tr } from "@chakra-ui/react";
import { GetCartData } from "../../services/dto";
import { ToMoney } from "../../services/helper";

interface Props {
  item: GetCartData;
}

const SaleData = ({ item }: Props) => {
  const [salePrice, setSalePrice] = useState<number>(item.sale_price);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSalePrice(item.sale_price);
  }, []);

  const updatePrice = () => {
    if (ref.current?.value) {
      item.sale_price = parseInt(ref.current.value);
      setSalePrice(parseInt(ref.current.value));
    }
  };

  return (
    <Tr key={item.product_id}>
      <Td>{item.product_id}</Td>
      <Td>{item.product_name}</Td>
      <Td>{ToMoney(item.buy_price)}</Td>
      <Td>
        <Input onChange={() => updatePrice()} ref={ref} value={salePrice} />
      </Td>
    </Tr>
  );
};

export default SaleData;
