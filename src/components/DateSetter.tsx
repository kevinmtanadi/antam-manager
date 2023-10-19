import { Select } from "@chakra-ui/react";
import React from "react";

interface Props {
  onSelectMonth: (month: number) => void;
  selectedMonth: number;
}

const DateSetter = ({ onSelectMonth, selectedMonth }: Props) => {
  const monthData = [
    { value: 0, name: "Januari" },
    { value: 1, name: "Februari" },
    { value: 2, name: "Maret" },
    { value: 3, name: "April" },
    { value: 4, name: "Mei" },
    { value: 5, name: "Juni" },
    { value: 6, name: "Juli" },
    { value: 7, name: "Agustus" },
    { value: 8, name: "September" },
    { value: 9, name: "Oktober" },
    { value: 10, name: "November" },
    { value: 11, name: "Desember" },
  ];

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(event.target.value, 10);
    onSelectMonth(selectedMonth);
  };

  return (
    <Select
      bg={"#ffffff"}
      defaultValue={selectedMonth}
      onChange={handleMonthChange}
    >
      {monthData.map((month) => (
        <option key={month.value} value={month.value}>
          {month.name}
        </option>
      ))}
    </Select>
  );
};

export default DateSetter;
