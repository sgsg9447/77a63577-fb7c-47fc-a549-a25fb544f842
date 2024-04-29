export const formatCurrency = (
  value: number,
  currencyCode: "krw" | "usd"
): string => {
  const options = {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat(
    currencyCode === "krw" ? "ko-KR" : "en-US",
    options
  ).format(value);
};

export const formatPercentage = (
  value: number
): { formattedValue: string; className: string } => {
  const roundedValue = Math.round(value * 10) / 10;
  const className = roundedValue > 0 ? "positive" : "negative";
  const formattedValue = `${roundedValue > 0 ? "+" : ""}${roundedValue.toFixed(1)}%`;

  return { formattedValue, className };
};
