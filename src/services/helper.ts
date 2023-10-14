import { addHours } from "date-fns";

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

export const convertDateFormat = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export const generateDefaultDate = (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
 
  return { startDate, endDate };
}

export const ShortenDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[monthIndex];

  return `${day} ${month}`;
}
export const UtcToGmt = (date: Date) => {
  return addHours(date, 7);
}

export const getCookieValue = (name: string): string | undefined => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : undefined;
}

export const setCookie = (cookieName: string, cookieValue: string, expirationDays: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  const cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookie;
}
