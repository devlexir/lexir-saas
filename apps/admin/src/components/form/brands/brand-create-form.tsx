import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInputCreate from '@components/ui/select-input-create';

import { useCreateBrandMutation } from '@data/brand/use-brand-create.mutation';
import { useBrandCommissionQuery } from '@data/brand/use-commission-brand.query';
import { useBrandSaasQuery } from '@data/brand/use-saas-brand.query';
import { useBrandTypeRelationshipQuery } from '@data/brand/use-type-relationship-brand.query';
import { useCountriesQuery } from '@data/settings/use-countries.query';

type FormValues = {
  subdomain?: any;
  country?: any;
  brand_name: string;
  commission?: any;
  type_relationship?: any;
  plan?: any;
  published?: any;
  active_brand?: any;
};

const CreateBrandForm = (props: any) => {
  const router = useRouter();

  const { mutate: createBrand, isLoading: loading } = useCreateBrandMutation();

  const methods = useForm<FormValues>({ mode: 'onChange' });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = methods;

  const subdomain = props.subdomain;

  /**
   * Dropdown objects
   */
  const saasList: object[] = [];
  const typeRelationshipList: object[] = [];
  const commissionList: object[] = [];
  const countriesList: object[] = [];

  /**
   * Dropdown calls
   */
  const { data: saas } = useBrandSaasQuery({
    subdomain: subdomain,
  });
  const { data: typeRelationship } = useBrandTypeRelationshipQuery({
    subdomain: subdomain,
  });
  const { data: commission } = useBrandCommissionQuery({
    subdomain: subdomain,
  });
  const { data: countries } = useCountriesQuery({ subdomain: subdomain });

  /**
   * Dropdown builds
   */
  saas &&
    saas?.saas_plans?.data.map((data: { name: string; value: string }) => {
      if (!saasList.some((list: any) => list?.name === data.name)) {
        saasList.push({ name: data.name, value: data.value });
      }
    });
  typeRelationship &&
    typeRelationship?.type_relationship.data.map(
      (data: { name: string; value: string }) => {
        if (
          !typeRelationshipList.some((list: any) => list?.name === data.name)
        ) {
          typeRelationshipList.push({
            name: data.name,
            value: data.value,
          });
        }
      }
    );
  commission &&
    commission?.commission?.data.map(
      (data: { name: string; value: string }) => {
        if (!commissionList.some((list: any) => list?.name === data.name)) {
          commissionList.push({ name: data.name, value: data.value });
        }
      }
    );
  countries &&
    countries?.data?.data.map((data: { name: string; value: string }) => {
      if (!countriesList.some((list: any) => list?.name === data.name)) {
        countriesList.push({ name: data.name, value: data.name });
      }
    });

  async function onSubmit({
    brand_name,
    country,
    commission,
    type_relationship,
    plan,
    published,
    active_brand,
  }: FormValues) {
    country = country.value;
    commission = commission.value;
    type_relationship = type_relationship.value;
    plan = plan.value;
    published = published.value;
    active_brand = active_brand.value;
    createBrand(
      {
        variables: {
          subdomain,
          country,
          brand_name,
          commission,
          type_relationship,
          plan,
          published,
          active_brand,
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
        <FormHeader
          title={'Brands'}
          subTitle={'Add new brand'}
          onClick={router.back}
          loading={loading}
          buttonDisabled={!isValid}
          cancelButtonTitle={'Cancel'}
          addButtonTitle={'Add New'}
        />

        {/* Active and Inactive Dropdown */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:mt-[160px] lg:px-4'>
          <Description
            title='Active or Inactive'
            details='Activete or Inactivate the Brand'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Active/Inactive
                </Label>
                <SelectInputCreate
                  {...register('active_brand', {
                    required: {
                      value: true,
                      message: 'You need to fill with the password',
                    },
                  })}
                  defaultOptions={{ name: 'Inactive', value: 'inactive' }}
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.value}
                  placeholder='Select a option'
                  className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                  options={[
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' },
                  ]}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Select a option to Activete or Inactivate the Brand
                </p>
                <ValidationError message={errors.active_brand?.message} />
              </div>
            </Card>
          </div>
        </div>

        {/* Published and Unpublished Dropdown */}
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Published or Unpublished'
            details='Publish or Unpublish the Brand'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Published/Unpublished
                </Label>
                <SelectInputCreate
                  {...register('published', {
                    required: {
                      value: true,
                      message: 'You need to fill with the password',
                    },
                  })}
                  defaultOptions={{ name: 'Unpublished', value: false }}
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.value}
                  placeholder='Select a option'
                  className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                  options={[
                    { name: 'Published', value: 'published' },
                    { name: 'Unpublished', value: 'unpublished' },
                  ]}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Select a option to Publish or Unpublish the Brand
                </p>
                <ValidationError message={errors.published?.message} />
              </div>
            </Card>
          </div>
        </div>

        {/* Brand Info */}
        <div className='my-5 flex flex-wrap sm:my-8  lg:px-4'>
          <Description
            title='Brand Info'
            details='Brand basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border '>
              <Input
                label='Name*'
                {...register('brand_name', {
                  required: {
                    value: true,
                    message: 'You need to fill with the password',
                  },
                })}
                type='text'
                variant='outline'
                className='mb-4 px-4 pt-8'
                error={errors.brand_name?.message!}
                note='Full name of the brand.'
                placeholder='Type the brand name'
              />
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Country
                </Label>
                <SelectInputCreate
                  {...register('country', {
                    required: {
                      value: true,
                      message: 'You need to fill with the password',
                    },
                  })}
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.value}
                  placeholder='Ex: France'
                  className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                  options={countriesList}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Country that brand is located.
                </p>
                <ValidationError message={errors.country?.message} />
              </div>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Comission*
                </Label>
                <SelectInputCreate
                  {...register('commission', {
                    required: {
                      value: true,
                      message: 'You need to fill with the password',
                    },
                  })}
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.value}
                  placeholder='0.2'
                  className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                  options={commissionList}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Informe comission of the Brand
                </p>
                <ValidationError message={errors.commission?.message} />
              </div>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Type Relationship*
                </Label>
                <SelectInputCreate
                  {...register('type_relationship', {
                    required: {
                      value: true,
                      message: 'You need to fill with the password',
                    },
                  })}
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.value}
                  placeholder='Distributor'
                  className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                  options={typeRelationshipList}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Type Relationship of the Brand
                </p>
                <ValidationError message={errors.type_relationship?.message} />
              </div>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Plan*
                </Label>
                <SelectInputCreate
                  {...register('plan', {
                    required: {
                      value: true,
                      message: 'You need to fill with the password',
                    },
                  })}
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.value}
                  placeholder='Choose a Plan'
                  className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                  options={saasList}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Informe the type of Plan
                </p>
                <ValidationError message={errors.plan?.message} />
              </div>
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateBrandForm;
