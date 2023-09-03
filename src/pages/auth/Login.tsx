import {
  Button,
  Card,
  CardBody,
  Container,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField";

interface Props {
  onLogin: () => void;
}

const Login = ({ onLogin }: Props) => {
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
              onLogin();
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
