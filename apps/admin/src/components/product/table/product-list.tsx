import Image from 'next/image';
import { useRouter } from 'next/router';

import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';

import {
  getAuthCredentials,
  hasAccess,
  superAdminAndAdminAndBrandOnly,
  superAdminAndAdminOnly,
} from '@utils/auth-utils';

import { useSettings } from '@contexts/settings.context';
import { siteSettings } from '@settings/site.settings';
import { Product, ProductPaginator } from '@ts-types/generated';

export type IProps = {
  title: string;
  products?: ProductPaginator;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const ProductList = ({ products, title }: IProps) => {
  const { currency } = useSettings();
  const locale = siteSettings.defaultLanguage;

  const { permissions: currentUserPermissions } = getAuthCredentials();
  const { data } = products! ?? {};

  const router = useRouter();

  const columns = [
    {
      title: '',
      dataIndex: 'imageSRC',
      key: 'imageSRC',
      width: 74,
      align: 'center',
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (image: any) => (
        <Image
          src={image ?? siteSettings.product.placeholder}
          alt='coupon banner'
          layout='responsive'
          width={'1200w'}
          height={'1200h'}
          className='overflow-hidden rounded'
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 90,
      ellipsis: true,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: 'left',
      width: 90,
      ellipsis: true,
      hasAccess: hasAccess(superAdminAndAdminOnly, currentUserPermissions),
    },

    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 70,
      align: 'left',
      ellipsis: true,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'product_type',
      align: 'left',
      width: 80,
      ellipsis: true,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
    },
    {
      title: 'Size (ML)',
      dataIndex: 'size',
      key: 'size',
      width: 70,
      align: 'left',
      ellipsis: true,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
    },
    {
      title: 'B2C Price',
      dataIndex: 'b2cprice',
      key: 'b2cprice',
      align: 'left',
      width: 70,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
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
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: function (b2cprice: any) {
        return formatPrice({
          amount: b2cprice,
          currencyCode: currency,
          locale: locale,
        });
      },
    },

    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      align: 'left',
      width: 50,
      hasAccess: hasAccess(
        superAdminAndAdminAndBrandOnly,
        currentUserPermissions
      ),
      render: (record: Product, id: any) => (
        <div className='flex cursor-pointer  justify-end overflow-visible'>
          <ActionButtons
            id={id?.id}
            editUrlDropDown={`${router.asPath}/${record}/edit`}
            deleteModalView='DELETE_PRODUCT'
          />
        </div>
      ),
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
          /* @ts-ignore */
          columns={columns.filter((column) => column.hasAccess === true)}
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
