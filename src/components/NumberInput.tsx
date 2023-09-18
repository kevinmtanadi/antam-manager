import { Input } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface Props {
  value: number;
  onChangeValue: (value: number) => void;
}

const NumberInput = ({ value, onChangeValue }: Props) => {
  const [, setNumericValue] = useState<number | undefined>(value);
  const [formattedValue, setFormattedValue] = useState(value.toLocaleString());

  const ref = useRef<HTMLInputElement>(null);

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Check for empty input
    if (value === "") {
      setFormattedValue("");
      setNumericValue(undefined);
      return;
    }

    // Remove commas and convert to a numeric value
    const numeric = parseFloat(value.replace(/,/g, ""));

    // Check if the numeric value is valid
    if (!isNaN(numeric)) {
      // Format the value with commas
      const formatted = numeric.toLocaleString();
      setFormattedValue(formatted);
      setNumericValue(numeric);
    } else {
      // Handle invalid input (e.g., non-numeric)
      setFormattedValue(value);
      setNumericValue(undefined);
    }

    onChangeValue(numeric);
  };

  return (
    <Input
      type="number"
      onChange={updateValue}
      ref={ref}
      value={formattedValue}
    />
  );
};

export default NumberInput;
