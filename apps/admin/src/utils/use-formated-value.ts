import { useSettings } from '@contexts/settings.context';
import { siteSettings } from '@settings/site.settings';

import { formatPrice } from './use-price';

export default function fomatedValue(amount: number, minimumFractionDigits = 2, maximumFractionDigits = 2) {

  const { currency } = useSettings();
  const locale = siteSettings.defaultLanguage;

  return formatPrice({
    amount: amount,
    currencyCode: currency,
    locale: locale,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits
  });
}
