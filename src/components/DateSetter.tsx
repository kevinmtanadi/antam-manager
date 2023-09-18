import { Select } from "@chakra-ui/react";
import React from "react";

interface Props {
  onSelectMonth: (month: number) => void;
  selectedMonth: number;
}

const DateSetter = ({ onSelectMonth, selectedMonth }: Props) => {
  const monthData = [
    { value: 1, name: "Januari" },
    { value: 2, name: "Februari" },
    { value: 3, name: "Maret" },
    { value: 4, name: "April" },
    { value: 5, name: "Mei" },
    { value: 6, name: "Juni" },
    { value: 7, name: "Juli" },
    { value: 8, name: "Agustus" },
    { value: 9, name: "September" },
    { value: 10, name: "Oktober" },
    { value: 11, name: "November" },
    { value: 12, name: "Desember" },
  ];

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(event.target.value, 10);
    onSelectMonth(selectedMonth);
  };

  return (
    <Select width={"150px"} defaultValue={selectedMonth} onChange={handleMonthChange}>
      {monthData.map((month) => (
        <option key={month.value} value={month.value}>
          {month.name}
        </option>
      ))}
    </Select>
  );
};

export default DateSetter;
