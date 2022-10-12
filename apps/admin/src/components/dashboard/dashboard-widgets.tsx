import { useAtom } from 'jotai';

import { useSSE } from 'use-sse';

import { CartIconBig } from '@components/icons/cart-icon-bag';
import { CoinIcon } from '@components/icons/coin-icon';
import { DollarIcon } from '@components/icons/shops/dollar';
import StickerCard from '@components/widgets/sticker-card';

import { API_ENDPOINTS } from '@utils/api/endpoints';
import { getSubdomain } from '@utils/request-utils';
import fomatedValue from '@utils/use-formated-value';

import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';
import { siteSettings } from '@settings/site.settings';

const Widgets = () => {
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);
  const locale = siteSettings.defaultLanguage;

  const { subdomain: subdomain } = getSubdomain();

  const [widgetsData, error] = useSSE(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/${API_ENDPOINTS.DASHBOARD_WIDGETS}?subdomain=${subdomain}&startDate=${startDate}&endDate=${endDate}`
    ).then((res) => res.json());
  }, [startDate, endDate]);

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className='w-full'>
        <StickerCard
          titleTransKey='Total Revenue'
          icon={<DollarIcon />}
          iconBgStyle={{ backgroundColor: '#A7F3D0' }}
          price={fomatedValue(widgetsData?.total_revenue, 0, 0)}
        />
      </div>
      <div className='w-full'>
        <StickerCard
          titleTransKey='Bottles'
          icon={<CartIconBig />}
          price={widgetsData?.total_bottles?.toLocaleString(locale)}
        />
      </div>
      <div className='w-full'>
        <StickerCard
          titleTransKey='Orders'
          icon={<CoinIcon />}
          price={widgetsData?.total_orders?.toLocaleString(locale)}
        />
      </div>
    </>
  );
};

export default Widgets;
