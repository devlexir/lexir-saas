import { useForm } from 'react-hook-form';

import { Card } from '@components/common/card';

const ProductsStep3 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='border rounded-lg pt-8 px-4'>
          <div className='text-[#6F6F6F] text-xl font-semibold'>
            Payment Method
          </div>
          <div className='pt-16 border-b pb-10'>
            <input
              {...register('bank_transfer', { required: true })}
              type='radio'
              value='Bank Transfer'
            />
            <span className='pl-4'>Bank Transfer</span>
          </div>
          <div className='pt-10 border-b pb-10 mb-12 '>
            <input
              {...register('bank_transfer', { required: true })}
              type='radio'
              value='Credit Card'
            />
            <span className='pl-4'>Credit Card</span>
          </div>
          <input type='submit' />
        </Card>
      </form>
    </div>
  );
};

export default ProductsStep3;
