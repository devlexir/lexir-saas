import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import ValidationError from '@components/ui/validation-error';

import { getSubdomain } from '@utils/request-utils';

import { useUpdateBrandMutation } from '@data/brand/use-brand-update.mutation';
import { useBrandCommissionQuery } from '@data/brand/use-commission-brand.query';
import { useBrandSaasQuery } from '@data/brand/use-saas-brand.query';
import { useBrandTypeRelationshipQuery } from '@data/brand/use-type-relationship-brand.query';
import { useCountriesQuery } from '@data/settings/use-countries.query';
import { yupResolver } from '@hookform/resolvers/yup';

import { brndValidationSchema } from './brand-validation-schema';

type FormValues = {
  id?: any;
  subdomain?: any;
  country?: any;
  brand_name: string;
  commission?: any;
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
  published?: any;
  active_brand?: any;
};

let defaultValues = {
  id: null,
  subdomain: 'lexir',
  country: '',
  brand_name: '',
  commission: '',
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
  published: '',
  active_brand: '',
};

const UpdateBrandForm = (props: any) => {
  const router = useRouter();
  const { subdomain: subdomain } = getSubdomain();

  const { mutate: updateBrand, isLoading: loading } = useUpdateBrandMutation();

  defaultValues = props.initialValues;

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(brndValidationSchema),
  });

  const {
    register,
    control,
    setError,
    formState: { errors },
  } = methods;

  /**
   * Dropdown states
   */
  const [countriesOption, setCountriesOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [commissionOption, setCommissionOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [typeRelationshipOption, setTypeRelationshipOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [saasListOption, setSaasListOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [activeBrandsOption, setActiveBrandsOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [publishedOption, setPublishedOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);

  /**
   * Dropdown objects
   */
  const saasList: object[] = [];
  const typeRelationshipList: object[] = [];
  const commissionList: object[] = [];
  const countriesList: object[] = [];
  const activeBrandsList: object[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  const publishedList: object[] = [
    { label: 'Published', value: 'published' },
    { label: 'Unpublished', value: 'unpublished' },
  ];

  /**
   * Dropdown calls
   */
  const { data: saas, isFetched: saasFetched } = useBrandSaasQuery({
    subdomain: subdomain,
  });
  const { data: typeRelationship, isFetched: typeRelationshipFetched } =
    useBrandTypeRelationshipQuery({
      subdomain: subdomain,
    });
  const { data: commission, isFetched: commissionFetched } =
    useBrandCommissionQuery({
      subdomain: subdomain,
    });
  const { data: countries, isFetched: countriesFetched } = useCountriesQuery({
    subdomain: subdomain,
  });

  /**
   * Dropdown builds
   */
  saas &&
    saas?.saas_plans?.data.map((data: { name: string; value: string }) => {
      if (!saasList.some((list: any) => list?.name === data.name)) {
        saasList.push({ label: data.name, value: data.name });
      }
    });
  typeRelationship &&
    typeRelationship?.type_relationship.data.map(
      (data: { name: string; value: string }) => {
        if (
          !typeRelationshipList.some((list: any) => list?.name === data.name)
        ) {
          typeRelationshipList.push({
            label: data.name,
            value: data.value,
          });
        }
      }
    );
  commission &&
    commission?.commission?.data.map(
      (data: { name: string; value: string }) => {
        if (!commissionList.some((list: any) => list?.name === data.name)) {
          commissionList.push({ label: data.name, value: data.value });
        }
      }
    );
  countries &&
    countries?.data?.data.map((data: { name: string; value: string }) => {
      if (!countriesList.some((list: any) => list?.name === data.name)) {
        countriesList.push({ label: data.name, value: data.name });
      }
    });

  /**
   * Change on fetch calls
   */
  useMemo(() => {
    setCountriesOption(
      //@ts-ignore
      countriesList.filter(
        (option: any) => option.value === defaultValues?.country
      )
    );
  }, [countriesFetched]);
  useMemo(() => {
    setCommissionOption(
      //@ts-ignore
      commissionList.filter(
        (option: any) => option.value === defaultValues?.commission
      )
    );
  }, [commissionFetched]);
  useMemo(() => {
    setTypeRelationshipOption(
      //@ts-ignore
      typeRelationshipList.filter(
        (option: any) => option.value === defaultValues?.type_relationship
      )
    );
  }, [typeRelationshipFetched]);
  useMemo(() => {
    setSaasListOption(
      //@ts-ignore
      saasList.filter((option: any) => option.value === defaultValues?.plan)
    );
  }, [saasFetched]);

  /**
   * onChange functions for state
   */
  const changeStatusFunction = (e: any) => {
    setCountriesOption(
      //@ts-ignore
      countriesList.filter((option: any) => option.value === e.value)
    );
  };
  const changeCommissionFunction = (e: any) => {
    setCommissionOption(
      //@ts-ignore
      commissionList.filter((option: any) => option.value === e.value)
    );
  };
  const changeTypeRelationshipFunction = (e: any) => {
    setTypeRelationshipOption(
      //@ts-ignore
      typeRelationshipList.filter((option: any) => option.value === e.value)
    );
  };
  const changeSaasPlanFunction = (e: any) => {
    setSaasListOption(
      //@ts-ignore
      saasList.filter((option: any) => option.value === e.value)
    );
  };
  const changeActiveBrandsFunction = (e: any) => {
    setActiveBrandsOption(
      //@ts-ignore
      activeBrandsList.filter((option: any) => option.value === e.value)
    );
  };
  const changePublishedFunction = (e: any) => {
    setPublishedOption(
      //@ts-ignore
      publishedList.filter((option: any) => option.value === e.value)
    );
  };

  async function onSubmit({
    subdomain,
    country,
    brand_name,
    commission,
    type_relationship,
    plan,
    active_brand,
    published,
  }: FormValues) {
    country = countriesOption[0]?.value;
    commission = commissionOption[0]?.value;
    type_relationship = typeRelationshipOption[0]?.value;
    plan = saasListOption[0]?.value;
    active_brand = activeBrandsOption[0]?.value;
    published = publishedOption[0]?.value;
    updateBrand(
      {
        variables: {
          id: defaultValues.id,
          input: {
            ...defaultValues,
            subdomain,
            country,
            brand_name,
            commission,
            type_relationship,
            plan,
            active_brand,
            published,
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

  const test = () => {
    console.log('sdfsd');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={test}>
        <FormHeader
          title={'Brands'}
          subTitle={'Edit Brand'}
          onClick={router.back}
          loading={loading}
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
            <Card className='divide-y rounded-lg bo rder '>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Active/Inactive
                </Label>
                <SelectInput
                  {...register('active_brand')}
                  control={control}
                  options={activeBrandsList}
                  placeholder='Select a option'
                  value={activeBrandsOption}
                  onChange={changeActiveBrandsFunction}
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
            <Card className='divide-y rounded-lg border'>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Published/Unpublished
                </Label>
                <SelectInput
                  {...register('published')}
                  control={control}
                  options={publishedList}
                  placeholder='Select a option'
                  value={publishedOption}
                  onChange={changePublishedFunction}
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
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
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

              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Country
                </Label>
                <SelectInput
                  {...register('country')}
                  control={control}
                  options={countriesList}
                  placeholder='Ex: France'
                  value={countriesOption}
                  onChange={changeStatusFunction}
                />

                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Country that brand is located.
                </p>
                <ValidationError message={errors.country?.message} />
              </div>

              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Comission
                </Label>
                <SelectInput
                  {...register('commission')}
                  control={control}
                  options={commissionList}
                  placeholder='0.2'
                  value={commissionOption}
                  onChange={changeCommissionFunction}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Informe comission of the Brand
                </p>
                <ValidationError message={errors.commission?.message} />
              </div>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Type Relationship
                </Label>
                <SelectInput
                  {...register('type_relationship')}
                  control={control}
                  options={typeRelationshipList}
                  placeholder='Distributor'
                  value={typeRelationshipOption}
                  onChange={changeTypeRelationshipFunction}
                />
                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  Type Relationship of the Brand
                </p>
                <ValidationError message={errors.type_relationship?.message} />
              </div>
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Plan
                </Label>
                <SelectInput
                  {...register('plan')}
                  control={control}
                  options={saasList}
                  placeholder='Choose a Plan'
                  value={saasListOption}
                  onChange={changeSaasPlanFunction}
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

export default UpdateBrandForm;
