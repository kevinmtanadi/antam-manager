import { Button } from "@chakra-ui/react";
import { useSignOut } from "react-auth-kit";

const Navbar = () => {
  const logout = useSignOut();
  return (
    <div>
      <Button onClick={() => logout()}>Keluar</Button>
    </div>
  );
};

export default Navbar;
