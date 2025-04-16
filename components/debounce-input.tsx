"use client";

import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

export default function DebounceInput({
  placeholder,
  className,
  defaultValue,
  onChange,
}: {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const handleSearch = useDebouncedCallback((term) => {
    if (term) {
      onChange?.(term);
    } else {
      onChange?.("");
    }
  }, 400);

  return (
    <Input
      className={className}
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={defaultValue}
    />
  );
}
