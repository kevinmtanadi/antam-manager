import {
  Box,
  Button,
  Card,
  CardBody,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField";
import { useContext } from "react";
import { ApiContext } from "../../App";

const CreateAccount = () => {
  const api = useContext(ApiContext);

  const toast = useToast();

  const register = (username: string, password: string) => {
    api.register(username, password)?.then((resp) => {
      const data = resp.data;
      const status = data.status;

      switch (status) {
        case 200:
          toast({
            title: "Berhasil membuat akun baru",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          break;
        case 500:
          toast({
            title: "Terjadi kesalahan server, segera hubungi admin",
            status: "error",
            duration: 6000,
            isClosable: true,
          });
      }
    });
  };

  return (
    <Card maxWidth={"450px"} padding={"35px 50px"}>
      <CardBody>
        <Box fontSize={"1.1rem"} fontWeight={"semibold"} marginBottom={3}>
          Buat akun baru
        </Box>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(values) => {
            register(values.username, values.password);
            console.log(values);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <VStack alignItems={"start"}>
                <InputField
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <InputField
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <Button
                  fontWeight={"normal"}
                  colorScheme="whatsapp"
                  marginTop={"20px"}
                  type="submit"
                >
                  Buat akun
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default CreateAccount;
