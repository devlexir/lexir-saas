import { useMemo } from 'react';

import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';

import { useBrandsQuery } from '@data/brand/use-brands.query';

export const BrandSelectInput = ({
  defaultValue,
  register,
  control,
  errors,
  setBrandOption,
  brandOption,
}: any) => {
  const brandList: object[] = [];
  const {
    data: brands,
    isFetched: brandFetched,
    isLoading: isBrandLoading,
  } = useBrandsQuery({
    subdomain: '',
  });

  brands &&
    brands?.brands.data.map((data: { name: string; brand_name: string }) => {
      if (!brandList.some((list: any) => list?.name === data.brand_name)) {
        brandList.push({ label: data.brand_name, value: data.brand_name });
      }
    });

  useMemo(() => {
    setBrandOption(
      brandList.filter((option: any) => option.value === defaultValue)
    );
  }, [brandFetched]);
  const changeBrandFunction = (e: any) => {
    setBrandOption(brandList.filter((option: any) => option.value === e.value));
  };

  return (
    <div className='mb-6 px-4 pt-8'>
      <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
        Brand
      </Label>
      <SelectInput
        {...register('brand')}
        control={control}
        options={brandList}
        placeholder='Select your brand'
        value={brandOption}
        onChange={changeBrandFunction}
        isloading={isBrandLoading}
      />

      <p className='mt-2 text-xs text-[#CCCCCC]'>
        The relevant brand for this report
      </p>
      <ValidationError message={errors.brand?.message} />
    </div>
  );
};
