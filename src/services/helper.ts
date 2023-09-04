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

export const shortenString = (text: string, length: number): string => {
  if (text.length > length) return text.slice(0, length) + '...';
  return text;
}

export const convertGoldPriceToIdr = (value: number): number => {
  const usdToIdr = 15244
  const ounceToGr = 31.1034768

  return (value * usdToIdr)/ounceToGr
}