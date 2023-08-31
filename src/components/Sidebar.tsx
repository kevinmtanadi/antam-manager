import { VStack, Box } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import { IconType } from "react-icons";
import {
  AiOutlineShoppingCart,
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { PiScroll } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";

interface Props {
  onChangePage: (page: string) => void;
  selectedPage: string;
}

interface SidebarNav {
  pageName: string;
  icon?: IconType;
  label: string;
}

const Sidebar = ({ onChangePage, selectedPage }: Props) => {
  const generalSidebarNav: SidebarNav[] = [
    {
      pageName: "dashboard",
      icon: AiOutlineDashboard,
      label: "Dashboard",
    },
    {
      pageName: "product",
      icon: AiOutlineShoppingCart,
      label: "Produk & Stok",
    },
    {
      pageName: "restock",
      icon: AiOutlinePlusCircle,
      label: "Restok",
    },
    {
      pageName: "transaction",
      icon: PiScroll,
      label: "Daftar Transaksi",
    },
    {
      pageName: "create_transaction",
      icon: AiOutlineCreditCard,
      label: "Transaksi Baru",
    },
    {
      pageName: "customer",
      icon: BsPeople,
      label: "Pelanggan",
    },
    {
      pageName: "report",
      icon: CgNotes,
      label: "Laporan Hari Ini",
    },
  ];

  const otherSidebarNav: SidebarNav[] = [
    {
      pageName: "manage_stock",
      label: "Manage Stock",
    },
    {
      pageName: "manage_user",
      label: "Pengurus Toko",
    },
  ];

  const settingSidebarNav: SidebarNav[] = [
    {
      pageName: "setting",
      icon: FiSettings,
      label: "Pengaturan",
    },
  ];

  return (
    <>
      <VStack
        className="side-bar"
        borderRight={"1px solid"}
        borderColor={"gray.200"}
        paddingTop={10}
        alignItems={"start"}
        height={"100vh"}
        paddingX={8}
        backgroundColor={"#FAFAFA"}
        overflowY={"scroll"}
        overflowX={"hidden"}
      >
        <VStack marginBottom={5} width={"100%"}>
          <Box as="span" width={"100%"} color={"gray.400"}>
            GENERAL
          </Box>
          {generalSidebarNav.map((item) => (
            <SidebarItem
              onChangePage={() => onChangePage(item.pageName)}
              icon={item.icon}
              label={item.label}
              active={item.pageName === selectedPage}
              key={item.pageName}
            />
          ))}
        </VStack>
        <VStack marginBottom={10}>
          <Box as="span" width={"100%"} color={"gray.400"}>
            OTHERS
          </Box>
          {otherSidebarNav.map((item) => (
            <SidebarItem
              onChangePage={() => onChangePage(item.pageName)}
              icon={item.icon}
              label={item.label}
              active={item.pageName === selectedPage}
              key={item.pageName}
            />
          ))}
        </VStack>
        <VStack marginTop={"auto"} marginBottom={8}>
          {settingSidebarNav.map((item) => (
            <SidebarItem
              onChangePage={() => onChangePage(item.pageName)}
              icon={item.icon}
              label={item.label}
              key={item.pageName}
            />
          ))}
          <Box marginTop={"2rem"}>storemanager.com</Box>
        </VStack>
      </VStack>
    </>
  );
};

export default Sidebar;
