import AddressGrid from '@components/address/address-grid';
import Layout from '@components/layout/layout';
import { useAddressQuery } from '@framework/basic-rest/address/address';

export default function AccountDetailsPage() {
  let { data, isLoading } = useAddressQuery();
  return (
    <div className='pt-4'>
      {!isLoading ? (
        <AddressGrid address={data?.data} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

AccountDetailsPage.Layout = Layout;
