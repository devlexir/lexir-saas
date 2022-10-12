import type { GetServerSideProps } from 'next';

import Layout from '@components/layouts/admin';
import CreateOnboardingBrandForm from '@components/onboarding/brand/brand-onboarding-create-form';

export default function CreateOnboardingBrandPage() {
  return (
    <>
      <div className='flex content-center justify-between bg-transparent sm:h-36 '>
        <div className='mt-4 mb-6 mr-4 w-full flex-col justify-between sm:flex '>
          <span className='text-32 font-bold text-gray-700'>Brands</span>
          <div className='flex items-center justify-between'>
            <div className='w-60 '>
              <span className=' text-20 font-bold text-gray-600'>
                Add new brand
              </span>
            </div>
          </div>
        </div>
      </div>
      <CreateOnboardingBrandForm subdomain='admin' />
    </>
  );
}
CreateOnboardingBrandPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      subdomain: query.site,
    },
  };
};
