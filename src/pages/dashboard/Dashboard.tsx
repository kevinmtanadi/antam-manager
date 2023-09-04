import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineCreditCard,
  AiOutlineDashboard,
} from "react-icons/ai";
import { PiScroll } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { SidebarNav } from "../../components/Sidebar";
import Product from "./Product";
import Transaction from "./Transaction";
import TransactionHistory from "./TransactionHistory";
import Report from "./Report";
import Stats from "./Stats";

const sidebarItems: SidebarNav[] = [
  {
    pageName: "dashboard",
    icon: AiOutlineDashboard,
    label: "Dashboard",
    targetPage: <Stats />,
  },
  {
    pageName: "product",
    icon: AiOutlineShoppingCart,
    label: "Produk & Stok",
    targetPage: <Product />,
  },
  {
    pageName: "transaction",
    icon: PiScroll,
    label: "Histori Transaksi",
    targetPage: <TransactionHistory />,
  },
  {
    pageName: "create_transaction",
    icon: AiOutlineCreditCard,
    label: "Transaksi Baru",
    targetPage: <Transaction />,
  },
  {
    pageName: "report",
    icon: CgNotes,
    label: "Laporan Keuangan",
    targetPage: <Report />,
  },
];

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const showPage = sidebarItems.find((item) => item.pageName === selectedPage);

  return (
    <>
      <Grid
        templateAreas={`"navbar navbar" "sidebar content"`}
        templateColumns={"300px 1fr"}
        templateRows={"60px 1fr"}
      >
        <GridItem area={"navbar"}>
          <Navbar />
        </GridItem>
        <GridItem area={"sidebar"}>
          <Sidebar
            onChangePage={(page) => setSelectedPage(page)}
            selectedPage={selectedPage}
            sidebarItems={sidebarItems}
          />
        </GridItem>
        <GridItem area={"content"}>
          <Box margin={10}>{showPage?.targetPage}</Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
