import AddActionButton from '@components/order/components/orderStep1/addActionButton';
import { Table } from '@components/ui/table';

import { formatPrice } from '@utils/use-price';

import { useSettings } from '@contexts/settings.context';
import { siteSettings } from '@settings/site.settings';
import { Product, ProductPaginator } from '@ts-types/generated';

export type IProps = {
  products?: ProductPaginator;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const ProductList = ({ products }: IProps) => {
  const { currency } = useSettings();
  const locale = siteSettings.defaultLanguage;

  const { data } = products! ?? {};

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 130,
      ellipsis: true,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: 'left',
      width: 70,
      ellipsis: true,
    },

    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 100,
      align: 'left',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'product_type',
      align: 'left',
      width: 80,
      ellipsis: true,
    },
    {
      title: 'Size (ML)',
      dataIndex: 'size',
      key: 'size',
      width: 70,
      align: 'left',
      ellipsis: true,
    },
    {
      title: 'ABV',
      dataIndex: 'abv',
      key: 'abv',
      width: 60,
      align: 'left',
      ellipsis: true,
    },
    //
    {
      title: 'Alcohol Taxes',
      className: 'cursor-pointer',
      dataIndex: 'price',
      key: 'price',
      align: 'left',
      width: 100,
      ellipsis: true,
      render: function (price: any) {
        return formatPrice({
          amount: price,
          currencyCode: currency,
          locale: locale,
        });
      },
    },
    {
      title: 'B2C Price',
      dataIndex: 'b2cprice',
      key: 'b2cprice',
      align: 'left',
      width: 70,
      render: function (b2cprice: any) {
        return formatPrice({
          amount: b2cprice,
          currencyCode: currency,
          locale: locale,
        });
      },
    },
    {
      title: 'B2B Price',
      dataIndex: 'b2bprice',
      key: 'b2bprice',
      align: 'left',
      width: 70,
      render: function (b2bprice: any) {
        return formatPrice({
          amount: b2bprice,
          currencyCode: currency,
          locale: locale,
        });
      },
    },
    {
      dataIndex: 'id',
      key: 'actions',
      align: 'left',
      width: 70,
      render: (record: Product, product: any) => (
        <div className='flex cursor-pointer  justify-center'>
          {product.quantity > 0 ? (
            <AddActionButton item={product} id={record?.id} />
          ) : (
            <span className='text-xs text-red-800'>Out of Stock</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className='mb-6 overflow-hidden rounded-lg border border-[#E7E7E7] bg-white shadow'>
        <div className='my-6 ml-4 flex flex-col text-xs text-[#6F6F6F]'>
          <span className='text-base font-semibold text-[#4F4F4F]'>
            Products List
          </span>
          <span className='mt-2 text-xs text-[#6F6F6F]'>{`Showing ${data.length} of ${data.length}`}</span>
        </div>
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText='Empty'
          data={data}
          rowKey='id'
          scroll={{ x: 900 }}
        />
      </div>
    </>
  );
};

export default ProductList;
