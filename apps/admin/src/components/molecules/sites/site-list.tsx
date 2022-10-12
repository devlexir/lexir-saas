import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import ActionButtons from '@components/common/action-buttons';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import TitleWithSort from '@components/ui/title-with-sort';

import { useIsRTL } from '@utils/locals';

import { siteSettings } from '@settings/site.settings';
import { Product, ProductPaginator, SortOrder } from '@ts-types/generated';

export type IProps = {
  subdomain: string;
  products?: ProductPaginator;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

type SortingObjType = {
  sort: SortOrder;
  column: string | null;
};

const SiteList = ({
  subdomain,
  products,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { data, paginatorInfo } = products! ?? {};
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<SortingObjType>({
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

  let columns = [
    {
      title: 'Logo',
      dataIndex: 'image',
      key: 'image',
      align: alignLeft,
      width: 40,
      render: ({ logo }: { logo: string }) => (
        <Image
          src={logo ?? siteSettings.product.placeholder}
          layout='fixed'
          width={42}
          height={42}
          className='overflow-hidden rounded'
        />
      ),
    },
    {
      title: (
        <TitleWithSort
          title='Subdomain'
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'subdomain'
          }
          isActive={sortingObj.column === 'subdomain'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'subdomain',
      key: 'subdomain',
      align: alignLeft,
      width: 70,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('subdomain'),
    },
    {
      title: (
        <TitleWithSort
          title='Name'
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
      width: 250,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'left',
      width: 80,
      render: (slug: string, record: Product) => (
        <ActionButtons
          id={record?.id}
          editUrl={`${router.asPath}/${slug}/edit`}
          deleteModalView='DELETE_PRODUCT'
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== 'shop');
  }

  return (
    <>
      <h1>{subdomain}</h1>
      <div className='mb-6 overflow-hidden rounded shadow'>
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey='id'
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className='flex items-center justify-end'>
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default SiteList;
