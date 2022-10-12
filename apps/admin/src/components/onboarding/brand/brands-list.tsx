import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';

import { SortOrder, UserPaginator } from '@ts-types/generated';

type IProps = {
  title: string;
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const BrandsList = ({
  title = 'Brands list',
  customers,
  onSort,
  onOrder,
}: IProps) => {
  const { data } = customers!;

  const { t } = useTranslation();
  const router = useRouter();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: any | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: any | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );

      onOrder(column);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brand_name',
      key: 'brand_name',
      align: 'left',
      width: 80,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      align: 'left',
      width: 40,
    },
    {
      title: 'Name',
      dataIndex: 'contact_name',
      key: 'contact_name',
      align: 'left',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'contact_email',
      key: 'contact_email',
      align: 'left',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      width: 100,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (id: string) => {
        return (
          <>
            <div className='flex cursor-pointer justify-evenly'>
              <div className='flex justify-end'>
                <ActionButtons
                  id={id}
                  editUrlDropDown={`${router.asPath}/${id}/edit`}
                  deleteModalView='DELETE_ONBOARDING_BRAND'
                />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className='mb-6 overflow-hidden rounded-lg border border-[#E7E7E7] bg-white shadow'>
        <div className='my-6 ml-4 flex flex-col text-xs text-[#6F6F6F]'>
          <span className='text-base font-semibold text-[#4F4F4F]'>
            {title}
          </span>
          <span className='mt-2 text-xs text-[#6F6F6F]'>{`Showing ${data.length} of ${data.length}`}</span>
        </div>
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey='id'
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default BrandsList;
