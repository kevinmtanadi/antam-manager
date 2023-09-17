import { HamburgerIcon } from "@chakra-ui/icons";
import { Center, Show } from "@chakra-ui/react";

interface Props {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: Props) => {
  return (
    <Show below="lg">
      <Center height={"100%"} width={"60px"}>
        <HamburgerIcon
          onClick={onOpen}
          w={9}
          h={9}
          className="cursor-pointer"
        />
      </Center>
    </Show>
  );
};

export default Navbar;
