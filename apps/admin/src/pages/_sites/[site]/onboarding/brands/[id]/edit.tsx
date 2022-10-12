import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Layout from '@components/layouts/admin';
import UpdateOnboardingBrandForm from '@components/onboarding/brand/brand-onboarding-edit-form ';
import Button from '@components/ui/button';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import SelectInput from '@components/ui/select-input';

import { useOnboardingUpdateBrandChangeStatusMutation } from '@data/onboarding-brand/use-onboarding-brand-change-status-update.mutation';
import { useOnboardingBrandQuery } from '@data/onboarding-brand/use-onboarding-brand.query';

type FormValues = {
  id?: any;
  status?: any;
};
export default function UpdateOnboardingBrandPage() {
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useOnboardingBrandQuery(query.id as string);

  const methods = useForm<FormValues>();

  const { register, handleSubmit, setError, control } = methods;

  const { mutate: updateBrandStatus } =
    useOnboardingUpdateBrandChangeStatusMutation();

  if (loading) return <Loader text='Loading' />;
  if (error) return <ErrorMessage message={error?.message as string} />;

  const brand_onboarding_status = [
    {
      name: 'Interested',
      value: 'Interested',
    },
  ];

  async function onSubmit({ status }: FormValues) {
    updateBrandStatus(
      {
        variables: {
          id: data?.id,
          input: {
            status: status.value,
          },
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
  }

  return (
    <>
      <div className='flex content-center justify-between bg-transparent sm:h-36 '>
        <div className='mt-4 mb-6 mr-4 w-full flex-col justify-between sm:flex '>
          <span className='text-32 font-bold text-gray-700'>Brands</span>
          <div className='flex items-center justify-between'>
            <div className='w-60 '>
              <span className=' text-20 font-bold text-gray-600'>Edit</span>
            </div>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex w-full items-start'
              >
                <div className='z-20 w-full md:me-5'>
                  <SelectInput
                    {...register('status')}
                    defaultInputValue={
                      //@ts-ignore
                      data?.status
                    }
                    control={control}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.value}
                    placeholder='Choose the status'
                    options={brand_onboarding_status}
                  />
                </div>
                <Button type='submit'>
                  <span className='hidden sm:block'>Change Status</span>
                  <span className='block sm:hidden'>Change</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <UpdateOnboardingBrandForm initialValues={data} />
    </>
  );
}
UpdateOnboardingBrandPage.Layout = Layout;

export const getServerSideProps = async () => ({
  props: {},
});
