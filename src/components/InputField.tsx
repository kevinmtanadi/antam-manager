import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  width?: string;
  defaultValue?: string;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  width,
  defaultValue,
}: Props) => {
  const [field, meta] = useField(name);
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} width={width}>
      <FormLabel>{label}</FormLabel>
      <Field
        height="52px"
        as={Input}
        {...field}
        placeholder={placeholder}
        type={type}
        name={name}
        defaultValue={defaultValue}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
