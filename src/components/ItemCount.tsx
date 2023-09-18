import { Select } from "@chakra-ui/react";

interface Props {
  onSelectCount: (count: number) => void;
  width?: any
}

const ItemCount = ({ onSelectCount, width }: Props) => {
  return (
    <Select width={width} backgroundColor={"#FAFAFA"}>
      <option onClick={() => onSelectCount(10)}>10</option>
      <option onClick={() => onSelectCount(25)}>25</option>
      <option onClick={() => onSelectCount(50)}>50</option>
      <option onClick={() => onSelectCount(100)}>100</option>
    </Select>
  );
};

export default ItemCount;
