import Image from '@components/ui/image';
import { Item } from '@contexts/cart/cart.utils';
import usePrice from '@framework/basic-rest/product/use-price';

const CheckoutProductItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: 'EUR',
  });
  return (
    <div className='border-b py-[10px] '>
      <div className='flex flex-row items-center '>
        <div className='w-4/6 sm:w-4/6 lg:w-2/6 flex flex-row'>
          <div className='flex h-16 w-16 shrink-0 rounded-md'>
            <Image
              src={item.imageSRC}
              alt={'item image'}
              className='rounded-md ltr:mr-5 rtl:ml-5'
              width={64}
              height={64}
            />
          </div>
          <div className='flex ml-1 items-center'>
            <div>
              <h6 className='text-ellipsis text-sm font-normal text-brand-dark'>
                {item.name}
              </h6>
            </div>
            <div className='visible sm:invisible ml-2'>
              <span className='text-ellipsis text-sm font-normal text-brand-dark'>
                {`x${item.quantity}`}{' '}
              </span>
            </div>
          </div>
        </div>

        <div className='flex invisible sm:visible sm:w-1/6 lg:w-2/6 shrink-0 justify-end text-base font-normal text-brand-dark'>
          <span> {`x${item.quantity}`} </span>
        </div>
        <div className='flex w-2/6 sm:w-1/6 lg:w-2/6 shrink-0 justify-end text-base font-normal text-brand-dark'>
          <span> {price} </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductItem;
