export const ToMoney = (value: number): string => {
  if (value === undefined) return "";
    const moneyString = value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        currencyDisplay: "symbol",
        maximumFractionDigits: 0,
      });

      return moneyString.replace("IDR", "Rp");
}