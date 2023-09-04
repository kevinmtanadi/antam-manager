import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  Text,
  Th,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { BsCartPlus } from "react-icons/bs";
import { ToMoney, shortenString } from "../../services/helper";

interface Props {
  products: ProductDetail[];
  noteWidth: string;
}

export interface ProductDetail {
  product_stock_id: string;
  buy_price: number;
  buy_at: string;
  note: string | null;
}

const ProductDetail = ({ products, noteWidth }: Props) => {
  return (
    <>
      <TableContainer>
        <Table width={"100%"} bgColor={"gray.100"}>
          <Thead>
            <Tr>
              <Th>Kode Item</Th>
              <Th>Harga Beli</Th>
              <Th>Tanggal Pembelian</Th>
              <Th width={noteWidth}>Catatan</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((item) => (
              <Tr key={item.product_stock_id}>
                <Td>
                  <Box>
                    <Text fontWeight={"normal"}>{item.product_stock_id}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight={"normal"}>{item.buy_price ? ToMoney(item.buy_price) : "-"}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight={"normal"}>{item.buy_at}</Text>
                  </Box>
                </Td>
                <Td width={noteWidth}>
                  <HStack justifyContent={'space-between'}>
                    <Text>{item.note ? shortenString(item.note, 50) : "-"}</Text>
                    <Icon as={BsCartPlus} className="cursor-pointer" />
                  </HStack>
                </Td>
                <Td>
                  <Icon as={BsCartPlus} className="cursor-pointer" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductDetail;
