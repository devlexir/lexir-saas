import { useModalState } from '@components/common/modal/modal.context';
import { useModalAction } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import CloseButton from '@components/ui/close-button';
import Input from '@components/ui/form/input';
import TextArea from '@components/ui/form/text-area';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

interface ContactFormValues {
  title: string;
  default: boolean;
  lat: number;
  lng: number;
  formatted_address?: string;
}

const AddAddressForm: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useModalState();

  const { closeModal } = useModalAction();

  function onSubmit(values: ContactFormValues, e: any) {}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      default: data || data?.default ? data?.default : '',
      formatted_address:
        data || data?.address?.formatted_address
          ? data?.address?.formatted_address
          : '',
    },
  });

  return (
    <div className='mx-auto w-full rounded-md bg-brand-light p-5 sm:p-8 md:w-[600px] lg:w-[900px] xl:w-[1000px]'>
      <CloseButton onClick={closeModal} />
      <Heading variant='title' className='mb-8 -mt-1.5'>
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='mb-6'>
          <Input
            variant='solid'
            label='Address Title'
            {...register('title', { required: 'Title Required' })}
            error={errors.title?.message}
          />
        </div>
        <div className='mb-6 grid grid-cols-1 gap-7'>
          <TextArea
            label='Address'
            {...register('formatted_address', {
              required: 'forms:address-required',
            })}
            error={errors.formatted_address?.message}
            className='text-brand-dark'
            variant='solid'
          />
        </div>
        <div className='flex w-full justify-end'>
          <Button className='mt-1.5 h-11 md:h-12' type='submit'>
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
