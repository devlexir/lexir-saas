import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import { brndValidationSchema } from '@components/form/brands/brand-validation-schema';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';

import { useCreateOnboardingBrandMutation } from '@data/onboarding-brand/use-onboarding-brand-create.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  brand_name: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  country: string;
  language: string;
  assigned: string;
  status: string;
  subdomain?: any;
};

const defaultValues = {
  brand_name: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  country: '',
  language: '',
  assigned: '',
  status: '',
  subdomain: 'lexir',
};

const CreateOnboardingBrandForm = (props: any) => {
  const router = useRouter();

  const { mutate: createOnboardingBrand, isLoading: loading } =
    useCreateOnboardingBrandMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(brndValidationSchema),
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitted, dirtyFields, errors },
  } = methods;

  // To disable a submit button and enable only if all fields are filled
  useEffect(() => {
    if (!isSubmitted) {
      Object.entries(dirtyFields).length ===
      Object.entries(defaultValues).length - 1
        ? setButtonDisabled(false)
        : setButtonDisabled(true);
    }
  }, [
    watch('brand_name'),
    watch('contact_name'),
    watch('contact_phone'),
    watch('contact_email'),
    watch('country'),
    watch('language'),
    watch('assigned'),
    watch('status'),
  ]);

  const subdomain = props.subdomain;

  async function onSubmit({
    brand_name,
    contact_name,
    contact_phone,
    contact_email,
    country,
    language,
    assigned,
    status,
  }: FormValues) {
    createOnboardingBrand(
      {
        variables: {
          brand_name,
          contact_name,
          contact_phone,
          contact_email,
          country,
          subdomain,
          language,
          assigned,
          status,
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Brand Info */}
        <div className='my-5 flex flex-wrap sm:my-8'>
          <Description
            title='Brand Info'
            details='Brand basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <Input
                label='Name*'
                {...register('brand_name')}
                type='text'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.brand_name?.message!}
                note='Full name of the brand.'
                placeholder='Type the brand name'
              />

              <Input
                label='Contact Name*'
                {...register('contact_name')}
                error={errors.contact_name?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='Informe Contact Name for the Brand'
                placeholder='Ex: Erick'
              />

              <Input
                label='Contact Phone*'
                {...register('contact_phone')}
                error={errors.contact_phone?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='Informe Contact Phone for the Brand'
                placeholder='+56 5565...'
              />

              <Input
                label='Contact Email*'
                {...register('contact_email')}
                error={errors.contact_email?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='Informe Contact Email for the Brand'
                placeholder='exemple@exemple.com.br'
              />

              <Input
                label='Country*'
                {...register('country')}
                error={errors.country?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='Country that brand is located.'
                placeholder='Ex: Lisboa, PT'
              />

              <Input
                label='Language*'
                {...register('language')}
                error={errors.language?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='Main language of your choose.'
                placeholder='Ex: english'
              />

              <Input
                label='Assigned*'
                {...register('assigned')}
                error={errors.assigned?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='For whom this brand will be assigned.'
                placeholder='Ex: Emily'
              />

              <Input
                label='Status*'
                {...register('status')}
                error={errors.status?.message!}
                variant='outline'
                className='mb-4 px-4 pt-8'
                note='How interested is this brand.'
                placeholder='Ex: Interested'
              />
            </Card>
          </div>
        </div>

        <div className='mb-4 flex justify-end gap-8 text-end'>
          <Button
            variant='outline'
            onClick={router.back}
            className='me-4'
            type='button'
          >
            Cancel
          </Button>

          <Button loading={loading} disabled={buttonDisabled}>
            Add New
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateOnboardingBrandForm;
