import { EmailIcon } from '@components/icons/email';
import { PhoneWhiteIcon } from '@components/icons/phone-white';
import Loader from '@components/ui/loader/loader';

import { useCustomerQuery } from '@data/customer/use-customer.query';

const CustomerCard = ({ customer }: any) => {
  return (
    <div className='bg-white p-4 max-w-[345px] rounded-lg'>
      {/* A row that consists of two columns each containing a group of two contents. */}
      <div className='flex flex-row pt-12'>
        <div className='grid grid-cols-2 gap-x-4 gap-y-5'>
          <div className='flex flex-col gap-y-3'>
            <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
              Customer
            </h3>
            <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
              {customer.customer_type && customer.customer_type === 'B2C'
                ? customer.first_name + ' ' + customer.last_name
                : customer.account_name}
            </span>
          </div>
          <div className='flex flex-col gap-y-3'>
            <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
              City
            </h3>
            <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
              {customer.city}
            </span>
          </div>

          <div className='flex flex-col gap-y-3'>
            <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
              Account Type
            </h3>
            <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
              {customer.customer_type}
            </span>
          </div>
          <div className='flex flex-col gap-y-3'>
            <h3 className='text-base font-black text-ellipsis overflow-hidden text-[#2D2D2D]'>
              Sales to Date
            </h3>
            <span className='text-base font-normal text-ellipsis overflow-hidden text-[#4F4F4F]'>
              {`€ ${'245,00'}`}
            </span>
          </div>

          <div className='flex flex-col gap-y-1 pt-14 '>
            <button className='flex h-12 border rounded shadow justify-center items-center'>
              <EmailIcon />
            </button>
          </div>
          <div className='flex flex-col gap-y-1 pt-14 '>
            <button className='flex h-12 rounded bg-[#1C8C64] shadow justify-center items-center'>
              <PhoneWhiteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerCardModal = ({ customerId }: { customerId: string }) => {
  const { data, isLoading: loading } = useCustomerQuery(customerId);

  if (loading || !data) return <Loader text='Loading' />;
  return <CustomerCard customer={data} />;
};

export default CustomerCardModal;
