import Button from '@components/ui/button';
import Status from '@components/ui/saas/past-invoices/status-color';
// import Router from 'next/router';
import Table from 'rc-table';
import React from 'react';

function handleClickPdf(request_url: string) {
  console.log(
    '🚀 ~ file: past-invoice-table.tsx ~ line 7 ~ handleClickPdf ~ request_url',
    request_url
  );
  // Router.push(request_url)
}

let data = [
  {
    id: 1,
    invoice: 'LXY-588-889',
    invoice_data: '01 Sep, 2022',
    amount: '€199.25',
    status: 'Paid',
    request_url: '/',
  },
  {
    id: 2,
    invoice: 'LXY-588-889',
    invoice_data: '01 Sep, 2022',
    amount: '€199.25',
    status: 'Paid',
    request_url: '/',
  },
  {
    id: 3,
    invoice: 'LXY-588-889',
    invoice_data: '01 Sep, 2022',
    amount: '€199.25',
    status: 'Refunded',
    request_url: '/',
  },
];

let columns = [
  {
    title: 'Invoice #',
    className: '',
    dataIndex: 'invoice',
    key: 'invoice',
    align: 'Left',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'Invoice date',
    className: '',
    dataIndex: 'invoice_data',
    key: 'invoice_data',
    align: 'Left',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'left',
    width: 100,
  },
  {
    title: 'Status',
    className: '',
    dataIndex: 'status',
    key: 'status',
    align: 'Left',
    width: 100,
    ellipsis: true,
    render: (status: string) => {
      return <Status status={status} />;
    },
  },
  {
    title: '',
    className: '',
    dataIndex: 'request_url',
    key: 'request_url',
    align: 'center',
    width: 120,
    ellipsis: true,
    render: (request_url: string) => {
      return (
        <Button
          className='h-8'
          variant='saasPrimary'
          onClick={() => handleClickPdf(request_url)}
        >
          Request PDF
        </Button>
      );
    },
  },
];

const PastInvoiceTable = () => {
  return (
    <div className='pt-5 flex flex-col gap-y-6'>
      <Table
        /* @ts-ignore */
        columns={columns}
        emptyText={'Empty Data'}
        data={data}
        rowKey='id'
        scroll={{ x: 500 }}
        rowClassName='bg-white'
        className='bg-fill-secondary'
      />
    </div>
  );
};

export default PastInvoiceTable;
