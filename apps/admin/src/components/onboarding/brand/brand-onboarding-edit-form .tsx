import { FormProvider, useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import { brndValidationSchema } from '@components/form/brands/brand-validation-schema';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';

import { useOnboardingUpdateBrandMutation } from '@data/onboarding-brand/use-onboarding-brand-update.mutation';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  id?: any;
  subdomain?: any;
  country: string;
  brand_name: string;
  commission?: number | null;
  type_relationship?: any;
  plan?: any;
  brand_country?: any;
  first_name?: any;
  last_name?: any;
  email?: any;
  brand_city?: any;
  type_of_products?: any;
  which_markets?: any;
  how_about_us?: any;
  anything_else_message?: any;
  brandRequestAccountInfo?: any;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  language?: string;
  assigned?: string;
  status?: string;
};

let defaultValues = {
  id: null,
  subdomain: 'lexir',
  country: '',
  brand_name: '',
  commission: 0,
  type_relationship: '',
  plan: '',
  brand_country: '',
  first_name: '',
  last_name: '',
  email: '',
  brand_city: '',
  type_of_products: '',
  which_markets: '',
  how_about_us: '',
  anything_else_message: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  language: '',
  assigned: '',
  status: '',
};

const UpdateOnboardingBrandForm = (props: any) => {
  const router = useRouter();
  const { query } = useRouter();

  defaultValues = props.initialValues;

  const { mutate: updateOnboardingBrand, isLoading: loading } =
    useOnboardingUpdateBrandMutation();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(brndValidationSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  async function onSubmit({
    subdomain,
    country,
    brand_name,
    commission,
    type_relationship,
    plan,
    contact_name,
    contact_phone,
    contact_email,
    language,
    assigned,
    status,
  }: FormValues) {
    updateOnboardingBrand(
      {
        variables: {
          id: defaultValues.id,
          input: {
            ...defaultValues,
            brand_name,
            contact_name,
            contact_phone,
            contact_email,
            country,
            language,
            assigned,
            status,
            subdomain,
            commission,
            type_relationship,
            plan,
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Brand Info */}
        <div className='my-5 flex flex-wrap sm:my-8'>
          <Description
            title='Brand Info'
            details='Brand basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:pe-4 md:w-1/3 md:pe-5'
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
        <div className='my-5 flex flex-wrap sm:my-8'>
          <Description
            title='Brand Onboarding'
            details='Brand basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border p-4'>
              <Link href={`/onboarding/welcome-lexir/${query.id}`} passHref>
                <Button className='w-full max-w-xs uppercase'>
                  Start the onboarding process
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/*     // @ts-ignore */}

        <div className='mb-4 flex justify-end gap-8 text-end'>
          <Button
            variant='outline'
            onClick={router.back}
            className='me-4'
            type='button'
          >
            Cancel
          </Button>

          <Button loading={loading}>Edit Brand</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateOnboardingBrandForm;
