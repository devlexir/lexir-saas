import { useModalAction } from '@components/ui/modal/modal.context';

const Customercard = ({ item }: any) => {
  const { id, customer_type, account_name, first_name, last_name, city } =
    item ?? {};

  const { openModal } = useModalAction();

  function handleVariableProduct() {
    return openModal('MOBILE_CUSTOMER_OPEN', id);
  }

  return customer_type && customer_type === 'B2B' ? (
    <div
      onClick={handleVariableProduct}
      className='flex p-4 h-[202] my-4 overflow-hidden transition-all duration-200 border border-[#E7E7E7] rounded-lg shadow-md '
    >
      <div className='flex flex-col items-start justify-between w-full gap-y-5'>
        <div className='flex flex-row justify-between w-full'>
          <h1
            title={account_name}
            className='text-xl text-[#2D2D2D] font-semibold text-ellipsis overflow-hidden '
          >
            {account_name}
          </h1>
          <span className='text-base text-white font-normal bg-[#85CDB4] p-1 rounded-lg'>
            {customer_type}
          </span>
        </div>

        <div className='flex flex-col w-full gap-x-4'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex text-[#4F4F4F] text-base rounded text-ellipsis overflow-hidden'>
              {city}
            </div>
            <div className='flex flex-row gap-x-4'>
              <div className='text-[#2D2D2D] text-base'>Sales to Date</div>
              <div className='text-[#2D2D2D] text-base font-[550]'>
                € 20,645
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      onClick={handleVariableProduct}
      className='flex p-4 h-[202] my-4 overflow-hidden transition-all duration-200 border border-[#E7E7E7] rounded-lg shadow-sm '
    >
      <div className='flex flex-col items-start justify-between w-full gap-y-5'>
        <div className='flex flex-row justify-between w-full'>
          <h1
            title={first_name}
            className='text-xl text-[#2D2D2D] font-semibold text-ellipsis overflow-hidden '
          >
            {`${first_name} ${last_name}`}
          </h1>
          <span className='text-base text-white font-normal bg-[#6CAFE6] p-1 rounded-lg'>
            {customer_type}
          </span>
        </div>

        <div className='flex flex-col w-full gap-x-4'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex text-[#4F4F4F] text-base rounded text-ellipsis overflow-hidden'>
              {city}
            </div>
            <div className='flex flex-row gap-x-4'>
              <div className='text-[#2D2D2D] text-base'>Sales to Date</div>
              <div className='text-[#2D2D2D] text-base font-[550]'>
                € 20,645
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customercard;
