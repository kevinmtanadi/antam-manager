import * as React from "react";
import { Input } from "@/components/ui/input";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "type"
  > {
  onChange?: (value: string) => void;
  value?: string | number;
  allowNegative?: boolean;
  allowDecimal?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      onChange,
      value = "",
      allowNegative = false,
      allowDecimal = false,
      ...props
    },
    ref
  ) => {
    // Convert number to string for the input
    const rawValue = value.toString();

    // Function to format numbers with commas
    const formatNumber = (num: string) => {
      if (num === "") return "";

      const parts = num.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/,/g, ""); // Remove commas for actual value

      // Allow empty input
      if (newValue === "") {
        onChange?.(newValue);
        return;
      }

      // Create regex pattern based on props
      let pattern = "^";
      if (allowNegative) pattern += "-?";
      pattern += "\\d";
      if (allowDecimal) pattern += "+(\\.\\d*)?$";
      else pattern += "+$";

      const regex = new RegExp(pattern);

      // Only update if the value matches our pattern
      if (regex.test(newValue)) {
        onChange?.(newValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow navigation keys, delete, backspace, tab, etc.
      const allowedKeys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Backspace",
        "Delete",
        "Tab",
        "Enter",
        "Escape",
        "Home",
        "End",
      ];

      // Allow decimal point if decimals are allowed
      if (allowDecimal && e.key === ".") {
        if (!rawValue.includes(".")) {
          return;
        }
        e.preventDefault();
        return;
      }

      // Allow minus sign if negative values are allowed
      if (allowNegative && e.key === "-") {
        if (e.currentTarget.selectionStart === 0 && !rawValue.includes("-")) {
          return;
        }
        e.preventDefault();
        return;
      }

      // Allow control keys for copy/paste/etc
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      // Allow numeric keys
      if (/^\d$/.test(e.key) || allowedKeys.includes(e.key)) {
        return;
      }

      // Prevent any other keys
      e.preventDefault();
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        value={formatNumber(rawValue)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
