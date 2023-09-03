import { VStack, Box } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import { IconType } from "react-icons";

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
      </VStack>
    </>
  );
};

export default Sidebar;
