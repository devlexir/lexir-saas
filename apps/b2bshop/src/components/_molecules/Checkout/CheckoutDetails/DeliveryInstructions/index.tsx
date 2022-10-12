import TextArea from '@components/ui/form/text-area';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const DeliveryInstructions = ({
  deliveryInstructions,
  setDeliveryInstructions,
}: any) => {
  const { register, watch } = useForm({
    defaultValues: {
      deliveryInstructions: deliveryInstructions,
    },
  });

  useEffect(() => {
    setDeliveryInstructions(watch('deliveryInstructions'));
  }, [watch('deliveryInstructions')]);

  return (
    <div className='w-full'>
      <div className='mx-auto w-full'>
        <form noValidate>
          <div className='mb-6'>
            <TextArea
              variant='normal'
              inputClassName='focus:border-2 focus:outline-none focus:border-brand'
              {...register('deliveryInstructions')}
              placeholder='Enter delivery instructions info'
            />
          </div>
          <div className='mt-14 flex justify-center'></div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
