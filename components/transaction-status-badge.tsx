import { Badge } from "./ui/badge";
const TransactionStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "PURCHASE":
      return (
        <Badge className="px-4 bg-green-300 text-green-800 font-semibold text-md">
          Beli
        </Badge>
      );
    case "SALE":
      return (
        <Badge className="px-4 bg-red-300 text-red-800 font-semibold text-md">
          Jual
        </Badge>
      );
    default:
      return status;
  }
};

export default TransactionStatusBadge;
