import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import Sidebar, { SidebarNav } from "./Sidebar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onChangePage: (page: string) => void;
  selectedPage: string;
  sidebarItems: SidebarNav[];
}

const SidebarDrawer = ({
  isOpen,
  onClose,
  onChangePage,
  selectedPage,
  sidebarItems,
}: Props) => {
  const changePage = (page: string) => {
    onChangePage(page);
    onClose();
  };

  return (
    <Drawer size={"xs"} placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <Sidebar
          selectedPage={selectedPage}
          sidebarItems={sidebarItems}
          onChangePage={changePage}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarDrawer;
