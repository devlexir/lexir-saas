import { Chevron } from '@components/ui/chevron-icon';
import Image from 'next/image';
import Router from 'next/router';
import Table from 'rc-table';
import React from 'react';

interface ISaasBrandTable {
  brand_data: {
    id: number;
    brand: string;
    logo: any;
    product_type: string;
    last_update: string;
  }[];
}

function handleClick(id: number) {
  Router.push(`/saas/brand/${id}`);
  console.log(id);
}

const SaasBrandTable = ({ brand_data }: ISaasBrandTable) => {
  let columns = [
    {
      title: 'Brand',
      dataIndex: 'logo',
      key: 'logo',
      align: 'Left',
      width: 100,
      render: (logo: string) => {
        return (
          <div className='flex items-center'>
            <Image src={logo} width={70} height={25} />
          </div>
        );
      },
    },
    {
      title: 'Product',
      className: 'cursor-pointer',
      dataIndex: 'product_type',
      key: 'product_type',
      align: 'Left',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Last Update',
      className: 'cursor-pointer',
      dataIndex: 'last_update',
      key: 'last_update',
      align: 'Left',
      width: 100,
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'left',
      width: 40,
      render: (id: number) => (
        <button onClick={() => handleClick(id)}>
          <Chevron fill='#2D2D2D' />
        </button>
      ),
    },
  ];
  return (
    <Table
      /* @ts-ignore */
      columns={columns}
      emptyText={'Empty Data'}
      data={brand_data}
      rowKey='id'
      scroll={{ x: 500 }}
      rowClassName='bg-white'
      ClassName='bg-fill-secondary'
    />
  );
};

export default SaasBrandTable;
