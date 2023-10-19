import {
  VStack,
  Box,
  Divider,
  Show,
  HStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import { IconType } from "react-icons";
import { MdOutlineLogout } from "react-icons/md";
import { useSignOut } from "react-auth-kit";
import Logo from "../assets/logo.svg";

interface Props {
  onChangePage: (page: string) => void;
  selectedPage: string;
  sidebarItems: SidebarNav[];
}

export interface SidebarNav {
  pageName: string;
  icon?: IconType;
  label: string;
  targetPage: JSX.Element;
}

const Sidebar = ({ onChangePage, selectedPage, sidebarItems }: Props) => {
  const logout = useSignOut();

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
          <Show below="lg">
            <HStack marginBottom={5}>
              <Image src={Logo} boxSize={{ lg: "32px", base: "28px" }} />
              <Heading
                marginLeft={3}
                fontFamily={"quicksand"}
                fontWeight={"bold"}
                fontSize={"1.5rem"}
              >
                Antam Manager
              </Heading>
            </HStack>
          </Show>
          <Box as="span" width={"100%"} color={"gray.400"}>
            GENERAL
          </Box>
          {sidebarItems.map((item) => (
            <SidebarItem
              onChangePage={() => onChangePage(item.pageName)}
              icon={item.icon}
              label={item.label}
              active={item.pageName === selectedPage}
              key={item.pageName}
            />
          ))}
        </VStack>
        <Divider />
        <SidebarItem
          label="Keluar"
          icon={MdOutlineLogout}
          onClick={() => logout()}
        />
      </VStack>
    </>
  );
};

export default Sidebar;
