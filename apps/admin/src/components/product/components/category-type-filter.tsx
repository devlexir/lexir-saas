import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { useCategoriesQuery } from '@data/category/use-categories.query';
import { useTypesQuery } from '@data/type/use-types.query';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

type Props = {
  onCategoryFilter: Function;
  onTypeFilter: Function;
  className?: string;
};

export default function CategoryTypeFilter({
  onTypeFilter,
  onCategoryFilter,
  className,
}: Props) {
  const { t } = useTranslation();

  const { data, isLoading: loading } = useTypesQuery();

  const { data: categoryData, isLoading: categoryLoading } = useCategoriesQuery(
    {
      limit: 999,
    }
  );

  console.log(categoryData);

  return (
    <div
      className={cn(
        'flex w-full flex-col space-y-5 md:flex-row md:items-end md:space-x-5 md:space-y-0',
        className
      )}
    >
      <div className='w-full'>
        <Label>{t('Filter by')}</Label>
        <Select
          options={data?.types}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t('Category')}
          onChange={onTypeFilter}
        />
      </div>
      <div className='w-full'>
        <Label>{t('Filter by')}</Label>
        <Select
          options={categoryData?.categories?.data}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t('Category')}
          isLoading={categoryLoading}
          onChange={onCategoryFilter}
        />
      </div>
    </div>
  );
}
