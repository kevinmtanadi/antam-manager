import { Box, Grid, GridItem, Show, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { PiScroll } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import Sidebar, { SidebarNav } from "../../components/Sidebar";
import SidebarDrawer from "../../components/SidebarDrawer";
import CreateAccount from "../auth/CreateAccount";
import Product from "./Product";
import Stats from "./Stats";
import Transaction from "./Transaction";
import TransactionHistory from "./TransactionHistory";
import { ApiContext } from "../../App";
import { useSignOut } from "react-auth-kit";

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
    pageName: "create_account",
    icon: AiOutlineUserAdd,
    label: "Buat Akun Baru",
    targetPage: <CreateAccount />,
  },
];

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const showPage = sidebarItems.find((item) => item.pageName === selectedPage);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const api = useContext(ApiContext);
  const logout = useSignOut();

  useEffect(() => {
    const isAuth = api.checkUserAuth(0);
    if (!isAuth) {
      logout();
    }
  });

  return (
    <>
      <Grid
        templateAreas={{
          base: `"navbar navbar" "content content"`,
          lg: `"navbar navbar" "sidebar content"`,
        }}
        templateColumns={"300px 1fr"}
        templateRows={"60px 1fr"}
      >
        <GridItem
          borderBottom={"1px solid"}
          borderColor={"gray.200"}
          bg={"#FAFAFA"}
          area={"navbar"}
        >
          <Navbar onOpen={onOpen} />
        </GridItem>
        <Show above="lg">
          <GridItem area={"sidebar"}>
            <Sidebar
              onChangePage={(page) => setSelectedPage(page)}
              selectedPage={selectedPage}
              sidebarItems={sidebarItems}
            />
          </GridItem>
        </Show>
        <GridItem area={"content"}>
          <Box margin={7}>{showPage?.targetPage}</Box>
        </GridItem>
      </Grid>
      <SidebarDrawer
        isOpen={isOpen}
        onClose={onClose}
        selectedPage={selectedPage}
        sidebarItems={sidebarItems}
        onChangePage={(page: string) => setSelectedPage(page)}
      />
    </>
  );
};

export default Dashboard;
