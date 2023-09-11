import {
  Button,
  Card,
  CardBody,
  Container,
  VStack,
  useToast
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { useSignIn } from "react-auth-kit";
import * as Yup from "yup";
import { ApiContext } from "../../App";
import InputField from "../../components/InputField";

const Login = () => {

  const api = useContext(ApiContext);

  const toast = useToast();
  const signIn = useSignIn();

  const login = (username: string, password: string) => {
    api.authenticateUser(username, password)?.then((resp) => {
      const data = resp.data;
      const status = data.status;
      const message = data.message;

      switch (status) {
        case 200:
          const token = message.split(":")[1];
          signIn({
            token: token,
            expiresIn: 60 * 60 * 24 * 7,
            tokenType: "Bearer",
            authState: {username: username},
          })
          break;
        case 404:
          toast({
            title: "Akun tidak ditemukan",
            status: "error",
            duration: 6000,
            isClosable: true,
          })
          break;
      }
    })
  }
  return (
    <Container
      width={"100wh"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
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
    </Container>
  );
};

export default Login;
