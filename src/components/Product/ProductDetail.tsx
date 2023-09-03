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
} from "@chakra-ui/react";
import { BsCartPlus } from "react-icons/bs";

interface Props {
  products: ProductDetail[];
}

export interface ProductDetail {
  product_stock_id: string;
  buy_price: number;
  buy_at: string;
  note: string | null;
}

const ProductDetail = ({ products }: Props) => {
  return (
    <>
      <TableContainer>
        <Table width={"100%"} bgColor={"gray.100"}>
          <Thead>
            <Tr>
              <Th>Kode Item</Th>
              <Th>Harga Beli</Th>
              <Th>Tanggal Pembelian</Th>
              <Th>Catatan</Th>
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
                    <Text fontWeight={"normal"}>{item.buy_price}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight={"normal"}>{item.buy_at}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Text>{item.note}</Text>
                  </Box>
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
