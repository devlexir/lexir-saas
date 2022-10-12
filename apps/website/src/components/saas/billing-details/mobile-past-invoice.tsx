import { DownloadActionIcon } from '@assets/icons/DownloadActionIcon';
import { EditIcon } from '@assets/icons/EditIcon';
import { ExclamationIcon } from '@assets/icons/ExclamationIcon';
import { InvoiceDateIcon } from '@assets/icons/InvoiceDateIcon';
import { InvoiceIcon } from '@assets/icons/InvoiceIcon';
import { PriceIcon } from '@assets/icons/PriceIcon';
import Button from '@components/ui/button';
import MobileInputHeader from '@components/ui/saas/mobile-input-header';
import Status from '@components/ui/saas/past-invoices/status-color';
import Search from '@components/ui/search';
import React, { useState } from 'react';

interface IMobilePastInvoiceTable {
  invoice_data: {
    id: number;
    invoice: string;
    invoice_data: string;
    amount: string;
    status: string;
    request_url: string;
  }[];
}

const MobilePastInvoiceTable = ({ invoice_data }: IMobilePastInvoiceTable) => {
  const [seeAll, setSeeAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function seeAllHandleClick() {
    setSeeAll((seeAll) => !seeAll);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  return (
    <div>
      <div className='p-4'>
        <MobileInputHeader title='Past invoices' />
      </div>
      <Search onSearch={handleSearch} inputClassName='h-5' />
      <div className='bg-white p-4 rounded text-sm gap-y-5 flex flex-col mt-4'>
        {seeAll ? (
          <>
            {invoice_data.map((data) => {
              return Invoice(data);
            })}
          </>
        ) : (
          <>
            {invoice_data.slice(0, 2).map((data) => {
              return Invoice(data);
            })}
            <span
              role='button'
              className='mt-2 block text-center text-sm font-bold text-brand hover:text-brand-muted ltr:ml-0.5 rtl:mr-0.5'
              onClick={seeAllHandleClick}
            >
              {'See All'}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default MobilePastInvoiceTable;

function handleClickPdf(request_url: string) {
  console.log(
    '🚀 ~ file: past-invoice-table.tsx ~ line 7 ~ handleClickPdf ~ request_url',
    request_url
  );
  // Router.push(request_url)
}

function Invoice(data: {
  id: number;
  invoice: string;
  invoice_data: string;
  amount: string;
  status: string;
  request_url: string;
}): JSX.Element {
  return (
    <div className='flex flex-col gap-y-6 py-2' key={data.id}>
      <div className='flex justify-between items-center'>
        <div className='flex flex-row w-full justify-between'>
          <div className='flex flex-row gap-x-1'>
            <h3 className='font-bold text-brand-dark'>{'Invoice #'}</h3>
            <p className='text-brand-muted text-right text-sm'>
              {data.invoice}
            </p>
          </div>
          <div className='flex items-center'>
            <p className='text-brand-muted text-right text-xs'>
              {data.invoice_data}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex flex-row items-center gap-x-2 justify-between w-full'>
          <p className='text-brand-dark text-left font-medium'>{data.amount}</p>
          <p className='text-right'>
            <Status status={data.status} />
          </p>
        </div>
      </div>

      <div className=' px-2'>
        <Button
          variant='customOutline'
          className='w-full h-[31px]'
          onClick={() => handleClickPdf(data.request_url)}
        >
          <div className='flex gap-x-5 flex-row justify-center items-center text-brand-muted'>
            <DownloadActionIcon fill='#4A4A4A' />
            {'Request PDF'}
          </div>
        </Button>
      </div>
    </div>
  );
}
