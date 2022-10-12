import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import ActionButtons from '@components/common/action-buttons';
import * as categoriesIcon from '@components/icons/category';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import TitleWithSort from '@components/ui/title-with-sort';

import { getIcon } from '@utils/get-icon';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';

import { CategoryPaginator, SortOrder } from '@ts-types/generated';

export type IProps = {
  categories: CategoryPaginator | undefined | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const CategoryList = ({
  categories,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = categories!;
  const rowExpandable = (record: any) => record.children?.length;

  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: t('table:table-item-details'),
      dataIndex: 'details',
      key: 'details',
      ellipsis: true,
      align: alignLeft,
      width: 200,
    },
    {
      title: t('table:table-item-image'),
      dataIndex: 'image',
      key: 'image',
      align: 'left',

      render: (image: any, { name }: { name: string }) => {
        if (!image?.thumbnail) return null;

        return (
          <Image
            src={image?.thumbnail ?? '/'}
            alt={name}
            layout='fixed'
            width={24}
            height={24}
            className='overflow-hidden rounded'
          />
        );
      },
    },
    {
      title: t('table:table-item-icon'),
      dataIndex: 'icon',
      key: 'icon',
      align: 'left',
      render: (icon: string) => {
        if (!icon) return null;
        return (
          <span className='flex items-center justify-center'>
            {getIcon({
              iconList: categoriesIcon,
              iconName: icon,
              className: 'w-5 h-5 max-h-full max-w-full',
            })}
          </span>
        );
      },
    },
    {
      title: t('table:table-item-slug'),
      dataIndex: 'slug',
      key: 'slug',
      align: 'left',
      ellipsis: true,
      width: 200,
      render: (slug: any) => (
        <div
          className='overflow-hidden truncate whitespace-nowrap'
          title={slug}
        >
          {slug}
        </div>
      ),
    },

    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'left',
      width: 50,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.CATEGORIES}/edit/${id}`}
          deleteModalView='DELETE_CATEGORY'
        />
      ),
    },
  ];

  return (
    <>
      <div className='mb-6 overflow-hidden rounded shadow'>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey='id'
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className='flex items-center justify-end'>
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default CategoryList;
