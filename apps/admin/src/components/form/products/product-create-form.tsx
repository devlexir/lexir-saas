import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Dropzone from '@components/_common/Dropzone';
import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Alert from '@components/ui/alert';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInputCreate from '@components/ui/select-input-create';

import { getSubdomain } from '@utils/request-utils';

import { useCreateProductMutation } from '@data/product/product-create.mutation';
import { useProductsQuery } from '@data/product/products.query';
import { useProductBrandsQuery } from '@data/useQueries/use-brands-product.query';
import { useProductSizeQuery } from '@data/useQueries/use-size-product.query';

// Types
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

type BrandType = {
  brand_name: string;
};

type SizeType = {
  name: string;
  value: string;
};

// Constants
const defaultValues: ProductFormProps = {
  subdomain: '',
  pageTitle: '',
  pageSubTitle: '',
  brand: '',
  category: '',
  name: '',
  size: '',
  abv: '',
  b2bprice: '',
  b2cprice: '',
  sku: '',
  quantity: 0,
  published: true,
};

export default function CreateProductForm({ pageTitle, pageSubTitle }: any) {
  const { t } = useTranslation();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { subdomain: subdomain } = getSubdomain();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const methods = useForm<ProductFormProps>({
    defaultValues,
  });

  const brandListMap: object[] = [];
  const sizeListMap: object[] = [];
  const categoryListMap: object[] = [];

  const { data: brands } = useProductBrandsQuery({
    subdomain: subdomain,
  });
  const { data: size } = useProductSizeQuery({
    subdomain: subdomain,
  });
  const { data: result } = useProductsQuery({
    subdomain: subdomain,
  });

  brands &&
    brands?.brands?.data.map((data: BrandType) => {
      if (!brandListMap.some((list: any) => list?.name === data.brand_name)) {
        brandListMap.push({ name: data.brand_name, value: data.brand_name });
      }
    });
  size &&
    size?.size?.data.map((data: SizeType) => {
      if (!sizeListMap.some((list: any) => list?.name === data.name)) {
        sizeListMap.push({ name: data.name, value: data.value });
      }
    });
  result &&
    result?.products?.data.map((data: { category: string }) => {
      if (
        !categoryListMap.some((category) => category.name === data.category)
      ) {
        categoryListMap.push({ name: data.category, value: data.category });
      }
    });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;

  const { mutate: createProduct, isLoading: creating } =
    useCreateProductMutation();

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
    brand = brand.value;
    category = category.value;
    size = size.value;
    createProduct(
      {
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
  // FILES FOR REPORT INPUT
  const [files, setFiles] = useState([]);
  const [dropzoneFile, setDropzoneFile] = useState({
    filename: '',
    url: '',
  });
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
            loading={creating}
            buttonDisabled={buttonDisabled}
            cancelButtonTitle={'Cancel'}
            addButtonTitle={'Save Product'}
          />

          <div className='lg:mt-[160px] lg:px-4'>
            {/* Basic Info */}
            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title={'Basic Info*'}
                details={
                  'Choose a meaningful name that helps you identify this SKU within your organization. Must be unique.'
                }
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
              />

              <div className='w-full sm:w-8/12 md:w-2/3'>
                <Card className='divide-y rounded-lg border '>
                  <div className='mb-6 px-4 pt-8'>
                    <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                      Brand*
                    </Label>
                    <SelectInputCreate
                      {...register('brand')}
                      control={control}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.value}
                      placeholder='Choose a brand'
                      className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                      options={brandListMap}
                    />
                    <p className='mt-2 text-xs text-[#CCCCCC]'>
                      Select the brand that you’re going to create a new
                      product.
                    </p>
                    <ValidationError message={errors.brand?.message} />
                  </div>

                  <div className='mb-6 px-4 pt-8'>
                    <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                      Category*
                    </Label>
                    <SelectInputCreate
                      {...register('category')}
                      control={control}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.value}
                      placeholder='Choose a category'
                      className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                      options={categoryListMap}
                    />
                    <p className='mt-2 text-xs text-[#CCCCCC]'>
                      Choose a category of the list.
                    </p>
                    <ValidationError message={t(errors.category?.message)} />
                  </div>

                  <Input
                    label='Name*'
                    {...register('name')}
                    error={errors.name?.message!}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    note='Choose a meaningful name that helps you identify this SKU within your organization. Must be unique.'
                    placeholder='Type the product name'
                  />

                  <Input
                    label='SKU*'
                    {...register('sku')}
                    error={errors.sku?.message!}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    placeholder='Type the product SKU'
                    note='Stock Keeping Unit (SKU).'
                  />

                  <div className='mb-6 px-4 pt-8'>
                    <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                      Size*
                    </Label>
                    <SelectInputCreate
                      {...register('size')}
                      control={control}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.value}
                      placeholder='Choose a Size'
                      className='placeholder:pl-4 placeholder:text-sm placeholder:text-[#CCCCCC]'
                      options={sizeListMap}
                    />
                    <p className='mt-2 text-xs text-[#CCCCCC]'>
                      Use the measurement in mililiters (ml).
                    </p>
                    <ValidationError message={errors.size?.message} />
                  </div>

                  <Input
                    label='Quantity*'
                    {...register('quantity')}
                    type='number'
                    error={errors.quantity?.message!}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    placeholder='Write down how many units of the product you have available.'
                    note='Use the measurement in units.'
                  />

                  <Input
                    label='ABV*'
                    {...register('abv')}
                    error={errors.abv?.message!}
                    variant='outline'
                    className='mb-6 px-4 pt-8'
                    placeholder='Choose a percentage.'
                    note='Percentage of Alcohol By Volume (ABV).'
                  />
                </Card>
              </div>
            </div>

            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title={'Image'}
                details={'Upload an image for the product.'}
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
              />

              <div className='w-full sm:w-8/12 md:w-2/3'>
                <Card className='divide-y rounded-lg border '>
                  <div className='mb-6 pt-2'>
                    <Dropzone
                      label='Image of Product'
                      setFiles={setFiles}
                      setDropzoneFile={setDropzoneFile}
                      typeFileAccepted={'.png'}
                    />
                  </div>
                </Card>
              </div>
            </div>

            {/* Price Section */}
            <div className='my-5 flex flex-wrap sm:my-8'>
              <Description
                title={'Price*'}
                details={'Choose the price for B2B and B2Cmarkets.'}
                className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
              />

              <div className='w-full sm:w-8/12 md:w-2/3'>
                <Card className='flex flex-col divide-x rounded-lg border sm:flex-row sm:divide-y'>
                  <Input
                    label='B2B Price'
                    {...register('b2bprice')}
                    error={errors.b2bprice?.message!}
                    variant='outline'
                    className='mb-6 grow px-4 pt-8 sm:mb-0 sm:pb-6'
                    placeholder='€ 00,00'
                    note='Business To Business price.'
                  />
                  <Input
                    label='B2C Price'
                    {...register('b2cprice')}
                    error={errors.b2cprice?.message!}
                    variant='outline'
                    className='mb-6 grow px-4 pt-8 sm:mb-0 sm:pb-6'
                    placeholder='€ 00,00'
                    note='Business To Consumer price.'
                  />
                </Card>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
