import { HamburgerIcon } from "@chakra-ui/icons";
import { Center, HStack, Heading, Image, Show } from "@chakra-ui/react";
import Logo from "../assets/logo.svg";

interface Props {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: Props) => {
  return (
    <HStack height={"100%"}>
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
      <Show above="lg">
        <HStack marginLeft={10}>
          <Image src={Logo} boxSize={"32px"} />
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
    </HStack>
  );
};

export default Navbar;
