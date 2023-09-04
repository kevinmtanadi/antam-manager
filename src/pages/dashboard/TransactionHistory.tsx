import {
  Card,
  CardBody,
  Collapse,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import TransactionDetail from "../../components/Transaction/TransactionDetail";
import { ToMoney } from "../../services/helper";

const transactions = [
  {
    transaction_id: "48",
    created_at: "2023-09-01 18:21:24",
    total_sale: null,
    total_buy: 1000000,
    purchase: [
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      },
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      },
      {
        transaction_purchase_id: "9",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
      }
    ],
    sales: [],
  },
  {
    transaction_id: "49",
    created_at: "2023-09-01 18:21:28",
    total_sale: null,
    total_buy: 1000000,
    purchase: [
      {
        transaction_purchase_id: "10",
        product_id: "UBS1",
        product_name: "UBS 1gr",
        buy_price: 1000000,
      },
    ],
    sales: [],
  },
  {
    transaction_id: "50",
    created_at: "2023-09-01 18:26:15",
    total_sale: null,
    total_buy: null,
    purchase: [],
    sales: [],
  },
  {
    transaction_id: "51",
    created_at: "2023-09-01 18:26:23",
    total_sale: null,
    total_buy: null,
    purchase: [],
    sales: [],
  },
  {
    transaction_id: "52",
    created_at: "2023-09-01 18:26:24",
    total_sale: null,
    total_buy: null,
    purchase: [],
    sales: [],
  },
  {
    transaction_id: "57",
    created_at: "2023-09-01 18:27:53",
    total_sale: 1050000,
    total_buy: null,
    purchase: [],
    sales: [
      {
        transaction_sale_id: "3",
        product_id: "UBS1",
        product_name: "UBS 1gr",
        buy_price: 1000000,
        sale_price: 1050000,
      },
      {
        transaction_sale_id: "4",
        product_id: "AT1",
        product_name: "Antam 1gr",
        buy_price: 1000000,
        sale_price: 1050000,
      },
    ],
  },
];

const TransactionHistory = () => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const toggleRow = (rowId: string) => {
    if (expandedRowId === rowId) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(rowId);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Tanggal Transaksi</Th>
                  <Th>Penjualan</Th>
                  <Th>Pembelian</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((item) => {
                  return (
                    <React.Fragment key={item.transaction_id}>
                      <Tr
                        onClick={() => toggleRow(item.transaction_id)}
                        className="cursor-pointer"
                      >
                        <Td>{item.created_at}</Td>
                        <Td>
                          {item.total_sale ? ToMoney(item.total_sale) : "-"}
                        </Td>
                        <Td>
                          {item.total_buy ? ToMoney(item.total_buy) : "-"}
                        </Td>
                        <Td>
                          {expandedRowId !== item.transaction_id ? (
                            <Icon color={"gray.500"} as={AiFillDownCircle} />
                          ) : (
                            <Icon color={"gray.500"} as={AiFillUpCircle} />
                          )}
                        </Td>
                      </Tr>
                      <Tr paddingY={0}>
                        <Td
                          colSpan={4}
                          padding={0}
                          border={0}
                          maxWidth={"500px"}
                        >
                          <Collapse in={expandedRowId === item.transaction_id}>
                            <TransactionDetail
                              purchase={item.purchase}
                              sales={item.sales}
                            ></TransactionDetail>
                          </Collapse>
                        </Td>
                      </Tr>
                    </React.Fragment>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default TransactionHistory;
