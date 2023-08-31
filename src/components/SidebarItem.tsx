import { Box, HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  onChangePage?: () => void;
  icon?: IconType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ onChangePage, icon, label, active }: Props) => {
  return (
    <Box
      width="100%"
      paddingY={1}
      className={
        active
          ? "cursor-pointer sidebar-item active"
          : "cursor-pointer sidebar-item"
      }
      as="span"
      onClick={onChangePage ? () => onChangePage() : () => {}}
    >
      <HStack marginY={0} spacing={4}>
        {icon && <Icon fontSize={"1.1rem"} as={icon} />}
        <Box>{label}</Box>
      </HStack>
    </Box>
  );
};

export default SidebarItem;
