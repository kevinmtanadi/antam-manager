import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import {
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUserAdd
} from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { PiScroll } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import Sidebar, { SidebarNav } from "../../components/Sidebar";
import { CartProvider } from "../../context/CartContext";
import Product from "./Product";
import Report from "./Report";
import Stats from "./Stats";
import Transaction from "./Transaction";
import TransactionHistory from "./TransactionHistory";
import CreateAccount from "../auth/CreateAccount";

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
  {
    pageName: "create_account",
    icon: AiOutlineUserAdd,
    label: "Buat Akun Baru",
    targetPage: <CreateAccount />,
  }
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
          <CartProvider>
            <Box margin={7}>{showPage?.targetPage}</Box>
          </CartProvider>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
