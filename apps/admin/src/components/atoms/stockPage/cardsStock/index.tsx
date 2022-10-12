import { useAtom } from 'jotai';

import { useSSE } from 'use-sse';

import StickerCard from '@components/widgets/sticker-card';

import { API_ENDPOINTS } from '@utils/api/endpoints';

import { B2bIcon } from '@assets/stock/b2b-icon';
import { B2cIcon } from '@assets/stock/b2c-icon';
import { BottleIcon } from '@assets/stock/icon-botles';
import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';

const Cards = () => {
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);

  const [orders] = useSSE(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/${API_ENDPOINTS.ORDERS}?startdate=${startDate}&enddate=${endDate}`
    ).then((res) => res.json());
  }, [startDate, endDate]);

  let b2bvsb2c: any = [];

  let series = [];

  const total =
    orders &&
    orders.data.reduce(function (sum: any, b: any) {
      return parseFloat(sum) + parseFloat(b.orderDetail.total);
    }, 0);

  orders &&
    orders.data &&
    (b2bvsb2c = Array.from(
      orders.data.reduce(
        (m: any, { orderDetail, orderCustomer }: any) =>
          m.set(
            orderCustomer.customer_type,
            (m.get(orderCustomer.customer_type) || 0) +
              parseFloat(orderDetail.total)
          ),
        new Map()
      ),
      ([name, total]) => ({ name, total })
    ));

  series = b2bvsb2c.map((aux: any) => {
    return (aux.total.toFixed(0) / total) * 100;
  });

  return (
    <div className='mb-6 flex w-full flex-col flex-wrap items-center justify-between gap-5 sm:flex-row lg:mt-6 lg:px-4'>
      <div className='w-full grow rounded-lg border sm:w-fit'>
        <StickerCard
          titleTransKey='Samples'
          icon={<BottleIcon />}
          iconBgStyle={{ backgroundColor: '#93C5FD' }}
          price={0}
          disabled
        />
      </div>
      <div className='w-full grow rounded-lg border hover:shadow-lg sm:w-fit'>
        <StickerCard
          titleTransKey='B2B Orders'
          icon={<B2bIcon />}
          price={338}
        />
      </div>
      <div className='w-full grow rounded-lg border hover:shadow-lg sm:w-fit'>
        <StickerCard titleTransKey='B2C Orders' icon={<B2cIcon />} price={3} />
      </div>
    </div>
  );
};

export default Cards;
