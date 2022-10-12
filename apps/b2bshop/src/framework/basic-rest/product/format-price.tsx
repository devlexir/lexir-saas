export function formatPrice({
  amount,
  currencyCode,
  locale,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });

  return formatCurrency.format(amount);
}
