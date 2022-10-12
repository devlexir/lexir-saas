import { useFormContext } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import { Card } from '@components/common/card';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';

type IProps = {
  initialValues: any;
};

export default function ProductSimpleForm({ initialValues }: IProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className='flex flex-wrap my-5 sm:my-8'>
      <Description
        title={t('form:form-title-simple-product-info')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className='w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8'
      />

      <Card className='w-full sm:w-8/12 md:w-2/3'>
        <Input
          label={`${t('form:input-label-price')}*`}
          {...register('price')}
          type='number'
          error={t(errors.price?.message!)}
          variant='outline'
          className='mb-5'
        />
        <Input
          label={t('form:input-label-sale-price')}
          type='number'
          {...register('sale_price')}
          error={t(errors.sale_price?.message!)}
          variant='outline'
          className='mb-5'
        />

        <Input
          label={`${t('form:input-label-quantity')}*`}
          type='number'
          {...register('quantity')}
          error={t(errors.quantity?.message!)}
          variant='outline'
          className='mb-5'
        />

        <Input
          label={`${t('form:input-label-sku')}*`}
          {...register('sku')}
          error={t(errors.sku?.message!)}
          variant='outline'
          className='mb-5'
        />

        <Input
          label={`${t('form:input-label-preview-url')}`}
          {...register('preview_url')}
          error={t(errors.preview_url?.message!)}
          variant='outline'
          className='mb-5'
        />

        <>
          <Label>{t('form:input-label-digital-file')}</Label>
          <FileInput
            name='digital_file_input'
            control={control}
            multiple={false}
            acceptFile={true}
            helperText={t('form:helper-text-digital-file')}
          />
          <ValidationError message={t(errors?.digital_file_input?.message!)} />
          <input type='hidden' {...register(`digital_file`)} />
        </>
      </Card>
    </div>
  );
}
