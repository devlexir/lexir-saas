import Image from 'next/image';

import LastTopUpAndDate from './last-top-and-date';
import Progress from './progress';
import StockLabel from './stock-label';

const CardProduct = ({
  productName = 'Baldoria Rosso',
  inStock = 1000,
  lastTopUp = 70,
  date = '04/12/2022',
  status = 'Plenty of Stock',
  available_percentage = 100,
  imageSRC,
}: any) => {
  return (
    <>
      <div className='flex flex-row border border-[#E7E7E7] bg-white px-4 py-2 hover:bg-[#F9F9F9] items-center mb-2'>
        <div className='w-1/6'>
          <Image src={imageSRC} width={'1200w'} height={'1200h'} />
        </div>
        <div className='w-5/6'>
          <div>
            <h1 className='text-xl font-semibold text-[#4F4F4F]'>
              {productName}
            </h1>
          </div>
          <div>
            <div className='flex flex-row items-center justify-end'>
              <StockLabel status={status} />
            </div>

            <div className='mt-3 flex items-center justify-between'>
              <div className='flex flex-col gap-2 sm:flex-row sm:gap-10'>
                <h3 className='text-base font-normal text-[#6F6F6F]'>
                  Available stock:
                </h3>
                <p className='text-base font-normal text-[#6F6F6F]'>{`${inStock} (UN)`}</p>
              </div>
              <LastTopUpAndDate lastTopUp={lastTopUp} date={date} />
            </div>

            <div>
              <div className='mt-5 h-2 w-full rounded-full bg-[#E7E7E7]'>
                <Progress
                  status={status}
                  available_percentage={available_percentage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
