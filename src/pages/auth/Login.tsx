import {
  Button,
  Card,
  CardBody,
  VStack,
  useToast,
  Image,
  HStack,
  Heading,
  Box,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { useSignIn } from "react-auth-kit";
import * as Yup from "yup";
import { ApiContext } from "../../App";
import InputField from "../../components/InputField";
import { CanceledError } from "axios";
import Logo from "../../assets/logo.svg";

const Login = () => {
  const api = useContext(ApiContext);

  const toast = useToast();
  const signIn = useSignIn();

  const login = (username: string, password: string) => {
    api
      .authenticateUser(username, password)
      ?.then((resp) => {
        const data = resp.data;
        const status = data.status;
        const message = data.message;

        switch (status) {
          case 200:
            const token = message.split(":")[1];
            console.log(token);
            signIn({
              token: token,
              expiresIn: 60 * 60 * 24 * 7,
              tokenType: "Bearer",
              authState: { username: username },
            });
            break;
          case 404:
            toast({
              title: "Username atau password salah",
              status: "error",
              duration: 6000,
              isClosable: true,
            });
            break;
          case 500:
            toast({
              title: "Username atau password salah",
              status: "error",
              duration: 6000,
              isClosable: true,
            });
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: "Terjadi kendala server",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };
  return (
    <Box
      width={"100% !important"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"#f6f7fb"}
    >
      <Card padding={"35px 50px"}>
        <CardBody>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string().required("Username is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={(values) => {
              login(values.username, values.password);
              console.log(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <VStack>
                  <HStack marginBottom={5}>
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
                  <Button marginTop={"20px"} type="submit">
                    Masuk
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Login;
