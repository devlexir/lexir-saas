import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';

import { CrossSignIcon } from '@assets/icons/CrossSignIcon';
import { DoneIcon } from '@assets/icons/DoneIcon';
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
      width: 150,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      align: 'left',
      width: 70,
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
      align: 'left',
      width: 70,
      render: (Commission: any) => {
        return <span>{Commission}%</span>;
      },
    },
    {
      title: 'Type Relationship',
      dataIndex: 'type_relationship',
      key: 'type_relationship',
      align: 'left',
      width: 100,
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      align: 'left',
      width: 80,
    },
    {
      title: 'Status',
      dataIndex: 'brand_status',
      key: 'brand_status',
      align: 'center',
      width: 20,
      render: (brand_status: string) => {
        if (brand_status === 'Not Validated') {
          return (
            <span className={'flex justify-center'}>
              <CrossSignIcon />
            </span>
          );
        } else if (brand_status === 'Validated') {
          return (
            <span className={'flex justify-center'}>
              <DoneIcon />
            </span>
          );
        }
      },
    },
    {
      title: 'Published?',
      dataIndex: 'published',
      key: 'published',
      align: 'center',
      width: 20,
      render: (published: boolean) => {
        if (!published) {
          return (
            <span className={'flex justify-center'}>
              <CrossSignIcon />
            </span>
          );
        } else {
          return (
            <span className={'flex justify-center'}>
              <DoneIcon />
            </span>
          );
        }
      },
    },

    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'left',
      width: 50,
      render: (id: string) => {
        return (
          <>
            <div className='flex cursor-pointer justify-evenly'>
              <div className='flex justify-end'>
                <ActionButtons
                  id={id}
                  editUrlDropDown={`${router.asPath}/${id}/edit`}
                  deleteModalView='DELETE_BRAND'
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
