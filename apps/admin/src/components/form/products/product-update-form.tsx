import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Alert from '@components/ui/alert';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';

import { getSubdomain } from '@utils/request-utils';

import { useUpdateProductMutation } from '@data/product/product-update.mutation';
import { useProductsQuery } from '@data/product/products.query';
import { useProductBrandsQuery } from '@data/useQueries/use-brands-product.query';
import { useProductSizeQuery } from '@data/useQueries/use-size-product.query';

import { ProductFormValues } from './form-utils';

type ProductFormProps = {
  subdomain?: any;
  pageTitle?: string;
  pageSubTitle?: string;
  brand?: any;
  category?: any;
  name?: any;
  size?: any;
  abv?: any;
  b2bprice?: any;
  b2cprice?: any;
  sku?: any;
  quantity?: number;
  published: boolean;
};

export default function UpdateProductForm({
  initialValues,
  pageTitle,
  pageSubTitle,
}: any) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation();
  const { subdomain: subdomain } = getSubdomain();

  const methods = useForm<ProductFormValues>({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;

  /**
   * Dropdown states
   */

  const [sizeOption, setSizeOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [brandOption, setBrandOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [categoryOption, setCategoryOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);

  /**
   * Dropdown objects
   */
  const sizeListMap: object[] = [];
  const brandListMap: object[] = [];
  const categoryListMap: object[] = [];

  /**
   * Dropdown calls
   */
  const { data: brand, isFetched: brandFetched } = useProductBrandsQuery({
    subdomain: subdomain,
  });

  const { data: size, isFetched: sizeFetched } = useProductSizeQuery({
    subdomain: subdomain,
  });
  const result = useProductsQuery({
    subdomain: subdomain,
  });

  /**
   * Dropdown builds
   */
  brand &&
    brand?.brands?.data?.map((data: { brand_name: string }) => {
      if (!brandListMap.some((list) => list?.brand_name === data.brand_name)) {
        brandListMap.push({ label: data.brand_name, value: data.brand_name });
      }
    });

  size &&
    size?.size?.data?.map((data: { name: string; value: string }) => {
      if (!sizeListMap.some((list: any) => list?.label === data.name)) {
        sizeListMap.push({ label: data.name, value: data.value });
      }
    });
  result &&
    result?.data?.products?.data.map((data: { category: string }) => {
      if (
        !categoryListMap.some((category) => category.label === data.category)
      ) {
        categoryListMap.push({ label: data.category, value: data.category });
      }
    });

  useMemo(() => {
    setSizeOption(
      //@ts-ignore
      sizeListMap.filter((option: any) => option.value === initialValues?.size)
    );
  }, [sizeFetched]);
  useMemo(() => {
    setBrandOption(
      //@ts-ignore
      brandListMap.filter(
        (option: any) => option.value === initialValues?.brand
      )
    );
    setCategoryOption(
      //@ts-ignore
      categoryListMap.filter(
        (option: any) => option.value === initialValues?.category
      )
    );
  }, [brandFetched]);

  const changeSizeFunction = (e: any) => {
    setSizeOption(
      //@ts-ignore
      sizeListMap.filter((option: any) => option.value === e.value)
    );
  };
  const changeBrandFunction = (e: any) => {
    setBrandOption(
      //@ts-ignore
      brandListMap.filter((option: any) => option.value === e.value)
    );
  };
  const changeCategoryFunction = (e: any) => {
    setCategoryOption(
      //@ts-ignore
      categoryListMap.filter((option: any) => option.value === e.value)
    );
  };

  const publishedList: object[] = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ];

  const [publishedSelectBoxOption, setPublishedSelectBoxOption] = useState(
    publishedList.filter((item) => item.value === initialValues.published)[0]
  );

  const onChangePublished = (e: any) => {
    setPublishedSelectBoxOption(
      publishedList.filter((item) => item.value === e.value)[0]
    );
  };

  const { mutate: updateProduct, isLoading: updating } =
    useUpdateProductMutation();

  async function onSubmit({
    sku,
    brand,
    category,
    name,
    size,
    quantity,
    abv,
    b2bprice,
    b2cprice,
    published,
  }: ProductFormProps) {
    brand = brandOption[0]?.value;
    category = categoryOption[0]?.value;
    size = sizeOption[0]?.value;
    published = publishedSelectBoxOption.value;
    console.log(published);
    updateProduct(
      {
        variables: {
          id: initialValues.id,
          input: {
            sku,
            brand,
            category,
            name,
            size,
            quantity,
            abv,
            b2bprice,
            b2cprice,
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

  return (
    <>
      {errorMessage ? (
        <Alert
          message={`common:${errorMessage}`}
          variant='error'
          closeable={true}
          className='mt-5 '
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormHeader
            title={pageTitle}
            subTitle={pageSubTitle}
            onClick={router.back}
            loading={updating}
            cancelButtonTitle={'Cancel'}
            addButtonTitle={'Edit'}
          />

          <div className='lg:mt-[160px] lg:px-4'>
            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title='Brand'
                details='Choose a brand for your product.'
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5'
              />

              <Card className='w-full rounded-lg border px-4 pt-8 pb-4 sm:w-8/12 md:w-2/3'>
                <div className=''>
                  <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                    Brand
                  </Label>
                  <SelectInput
                    {...register('brand', {})}
                    control={control}
                    options={brandListMap}
                    placeholder='Choose a category'
                    value={brandOption}
                    onChange={changeBrandFunction}
                  />

                  <p className='mt-2 text-xs text-[#CCCCCC]'>
                    Select the brand that you’re going to create a new product.
                  </p>
                  <ValidationError message={t(errors.brand?.message)} />
                </div>
              </Card>
            </div>

            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title='Category'
                details='Choose a category for your product.'
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5'
              />

              <Card className='w-full rounded-lg border px-4 pt-8 pb-4 sm:w-8/12 md:w-2/3'>
                <div className=''>
                  <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                    Category
                  </Label>
                  <SelectInput
                    {...register('category')}
                    control={control}
                    options={categoryListMap}
                    placeholder='Choose a category'
                    value={categoryOption}
                    onChange={changeCategoryFunction}
                  />

                  <p className='mt-2 text-xs text-[#CCCCCC]'>
                    Choose a category of the list.
                  </p>
                  <ValidationError message={errors.category?.message} />
                </div>
              </Card>
            </div>

            {/* Basic Info */}
            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title={'Basic Info'}
                details={
                  'Choose a meaningful name that helps you identify this SKU within your organization. Must be unique.'
                }
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
              />

              <div className='w-full sm:w-8/12 md:w-2/3'>
                <Card className='divide-y rounded-lg border '>
                  <Input
                    label='Name'
                    {...register('name', { value: initialValues.name })}
                    error={errors.name?.message}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    note='Choose a meaningful name that helps you identify this SKU
                  within your organization. Must be unique.'
                    placeholder='Type the product name'
                  />

                  <Input
                    label='SKU'
                    {...register('sku', { value: initialValues.sku })}
                    error={errors.sku?.message}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    placeholder='Type the product SKU'
                    note='Stock Keeping Unit (SKU).'
                  />

                  <div className='mb-6 px-4 pt-8'>
                    <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                      Size
                    </Label>
                    <SelectInput
                      {...register('size')}
                      control={control}
                      options={sizeListMap}
                      placeholder='Choose a Size'
                      value={sizeOption}
                      onChange={changeSizeFunction}
                    />

                    <p className='mt-2 text-xs text-[#CCCCCC]'>
                      Use the measurement in mililiters (ml).
                    </p>
                    <ValidationError message={errors.size?.message} />
                  </div>

                  <Input
                    label='Quantity'
                    {...register('quantity', { value: initialValues.quantity })}
                    type='number'
                    error={errors.quantity?.message!}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    placeholder='Write down how many units of the product you have available.'
                    note='Use the measurement in units.'
                  />

                  <Input
                    label='ABV'
                    {...register('abv', { value: initialValues.abv })}
                    error={errors.abv?.message!}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    placeholder='Choose a percentage.'
                    note='Percentage of Alcohol By Volume (ABV).'
                  />
                </Card>
              </div>
            </div>

            {/* Price Section */}
            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title={'Price'}
                details={'Choose the price for B2B and B2Cmarkets.'}
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
              />

              <div className='w-full sm:w-8/12 md:w-2/3'>
                <Card className='flex flex-col divide-x rounded-lg border sm:flex-row sm:divide-y'>
                  <Input
                    label='B2B Price'
                    {...register('b2bprice', { value: initialValues.b2bprice })}
                    error={errors.b2bprice?.message}
                    variant='outline'
                    className='mb-6 grow px-4 pt-8 sm:mb-0 sm:pb-6'
                    placeholder='€ 00,00'
                    note='Business To Business price.'
                  />
                  <Input
                    label='B2C Price'
                    {...register('b2cprice', { value: initialValues.b2cprice })}
                    error={errors.b2cprice?.message}
                    variant='outline'
                    className='mb-6 grow px-4 pt-8 sm:mb-0 sm:pb-6'
                    placeholder='€ 00,00'
                    note='Business To Consumer price.'
                  />
                </Card>
              </div>
            </div>

            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title='Is Published?'
                details='Publish the product or unpublished the product'
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
              />
              <div className='w-full sm:w-8/12 md:w-2/3'>
                <Card className='divide-y rounded-lg border '>
                  <div className='mb-6 px-4 pt-8'>
                    <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                      Is Published?
                    </Label>

                    <SelectInput
                      {...register('published')}
                      control={control}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.value}
                      placeholder='Choose a brand'
                      className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                      value={publishedSelectBoxOption}
                      options={publishedList}
                      onChange={onChangePublished}
                    />

                    <p className='mt-2 text-xs text-[#CCCCCC]'>
                      Select a option
                    </p>
                    <ValidationError message={errors.published?.message} />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
