import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { animateScroll } from 'react-scroll';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Card } from '@components/common/card';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio/radio';
import TextArea from '@components/ui/text-area';

import { useCreateProductMutation } from '@data/product/product-create.mutation';
import { useUpdateProductMutation } from '@data/product/product-update.mutation';
import { useShopQuery } from '@data/shop/use-shop.query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Product } from '@ts-types/generated';

import {
  ProductFormValues,
  getProductDefaultValues,
  getProductInputValues,
} from './form-utils';
import ProductCategoryInput from './product-category-input';
import ProductGroupInput from './product-group-input';
import ProductSimpleForm from './product-simple-form';
import ProductTagInput from './product-tag-input';
import { productValidationSchema } from './product-validation-schema';

type ProductFormProps = {
  initialValues?: Product | null;
};

export default function CreateOrUpdateProductForm({
  initialValues,
}: ProductFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation();
  const { data: shopData } = useShopQuery(router.query.shop as string, {
    enabled: !!router.query.shop,
  });
  const shopId = shopData?.shop?.id!;
  const methods = useForm<ProductFormValues>({
    resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    defaultValues: getProductDefaultValues(initialValues),
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = methods;

  const { mutate: createProduct, isLoading: creating } =
    useCreateProductMutation();
  const { mutate: updateProduct, isLoading: updating } =
    useUpdateProductMutation();

  const onSubmit = async (values: ProductFormValues) => {
    const inputValues = getProductInputValues(values, initialValues);

    if (initialValues) {
      updateProduct(
        {
          variables: {
            id: initialValues.id,
            input: { ...inputValues, shop_id: initialValues.shop_id! },
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
    } else {
      createProduct(
        {
          shop_id: shopId,
          ...inputValues,
        },
        {
          onError: (error: any) => {
            if (error?.response?.data?.message) {
              setErrorMessage(error?.response?.data?.message);
              animateScroll.scrollToTop();
            } else {
              Object.keys(error?.response?.data).forEach((field: any) => {
                setError(field, {
                  type: 'manual',
                  message: error?.response?.data[field][0],
                });
              });
            }
          },
        }
      );
    }
  };
  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant='error'
          closeable={true}
          className='mt-5'
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8'>
            <Description
              title={t('form:featured-image-title')}
              details={t('form:featured-image-help-text')}
              className='w-full px-0 pb-5 sm:pe-4 md:pe-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />

            <Card className='w-full sm:w-8/12 md:w-2/3'>
              <FileInput name='image' control={control} multiple={false} />
            </Card>
          </div>

          <div className='flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8'>
            <Description
              title={t('form:gallery-title')}
              details={t('form:gallery-help-text')}
              className='w-full px-0 pb-5 sm:pe-4 md:pe-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />

            <Card className='w-full sm:w-8/12 md:w-2/3'>
              <FileInput name='gallery' control={control} />
            </Card>
          </div>

          <div className='flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8'>
            <Description
              title={t('form:type-and-category')}
              details={t('form:type-and-category-help-text')}
              className='w-full px-0 pb-5 sm:pe-4 md:pe-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />

            <Card className='w-full sm:w-8/12 md:w-2/3'>
              <ProductGroupInput
                control={control}
                error={t((errors?.type as any)?.message)}
              />
              <ProductCategoryInput control={control} setValue={setValue} />

              <ProductTagInput control={control} setValue={setValue} />
            </Card>
          </div>

          <div className='flex flex-wrap my-5 sm:my-8'>
            <Description
              title={t('form:item-description')}
              details={`${
                initialValues
                  ? t('form:item-description-edit')
                  : t('form:item-description-add')
              } ${t('form:product-description-help-text')}`}
              className='w-full px-0 pb-5 sm:pe-4 md:pe-5 sm:w-4/12 md:w-1/3 sm:py-8'
            />

            <Card className='w-full sm:w-8/12 md:w-2/3'>
              <Input
                label={`${t('form:input-label-name')}*`}
                {...register('name')}
                error={t(errors.name?.message!)}
                variant='outline'
                className='mb-5'
              />

              <Input
                label={`${t('form:input-label-unit')}*`}
                {...register('unit')}
                error={t(errors.unit?.message!)}
                variant='outline'
                className='mb-5'
              />

              <TextArea
                label={t('form:input-label-description')}
                {...register('description')}
                error={t(errors.description?.message!)}
                variant='outline'
                className='mb-5'
              />

              <div>
                <Label>{t('form:input-label-status')}</Label>
                <Radio
                  {...register('status')}
                  label={t('form:input-label-published')}
                  id='published'
                  value='publish'
                  className='mb-2'
                />
                <Radio
                  {...register('status')}
                  id='draft'
                  label={t('form:input-label-draft')}
                  value='draft'
                />
              </div>
            </Card>
          </div>

          <ProductSimpleForm initialValues={initialValues} />

          <div className='mb-4 text-end'>
            {initialValues && (
              <Button
                variant='outline'
                onClick={router.back}
                className='me-4'
                type='button'
              >
                {t('form:button-label-back')}
              </Button>
            )}
            <Button loading={updating || creating}>
              {initialValues
                ? t('form:button-label-update-product')
                : t('form:button-label-add-product')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
