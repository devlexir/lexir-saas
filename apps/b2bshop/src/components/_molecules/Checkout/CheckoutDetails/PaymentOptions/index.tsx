import cn from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';

const PaymentOption = ({
  paymentOption,
  setPaymentOption,
  value,
  register,
}: any) => {
  return (
    <div
      className='flex h-36 w-full cursor-pointer flex-row'
      onChange={(event: React.FormEvent<HTMLElement>) => {
        setPaymentOption((event.target as HTMLInputElement).value);
      }}
    >
      <div
        className={cn(
          'w-full bg-light flex grow flex-row items-center justify-between rounded border px-5',
          paymentOption === value
            ? 'border-brand shadow-card'
            : 'border-fill-two'
        )}
      >
        <label className='text-base font-bold text-brand-dark md:text-xl'>
          {value}
        </label>
        <input
          {...register('payment_option', { required: true })}
          type='radio'
          value={value}
          checked={paymentOption === value ? true : false}
          className={cn(
            'w-3 h-3 bg-light items-center justify-between rounded border p-3',
            paymentOption === value ? 'text-brand' : 'border-gray-300'
          )}
        />
      </div>{' '}
    </div>
  );
};

const PaymentOptions = ({ paymentOption, setPaymentOption }: any) => {
  const { register } = useForm({
    defaultValues: {
      payment_option: paymentOption,
    },
  });

  return (
    <div className='w-full'>
      <form className='mt-10 flex flex-col justify-center' noValidate>
        <div className='flex flex-row gap-x-4'>
          <PaymentOption
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            value={'Direct Debit'}
            register={register}
          />
          <PaymentOption
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            value={'Bank Transfer'}
            register={register}
          />
        </div>
      </form>
    </div>
  );
};

export default PaymentOptions;
