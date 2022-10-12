import { integrationsData } from '@data/payload/integrations_data';

const IntegrationsList = () => {
  return (
    <div className='mb-6 overflow-hidden rounded-lg border border-[#E7E7E7] bg-white pb-6 shadow'>
      {integrationsData?.data?.map((categories) => (
        <>
          <div className='my-6 ml-4 flex flex-col text-xs text-[#6F6F6F]'>
            <span className='text-base font-semibold text-[#4F4F4F]'>
              {categories.category}
            </span>
            <span className='mt-2 text-xs text-[#6F6F6F]'>{`Showing ${categories.apps.length} of ${categories.apps.length}`}</span>
          </div>
          <div className='mx-4 flex flex-wrap justify-center gap-3 md:justify-start'>
            {categories?.apps?.map((app) => (
              <div className='w-36 rounded-lg border border-[#E7E7E7] bg-white shadow hover:bg-[#F9F9F9] md:w-64 '>
                <div className='flex flex-col gap-y-2 py-3 px-2 md:flex-row md:items-center md:gap-y-0 md:gap-x-4 md:py-4 md:pl-4 md:pr-8'>
                  <span className='flex items-center justify-center'>
                    {app.app_logo_src}
                  </span>
                  <div>
                    <h5 className='text-sm font-bold text-[#4F4F4F] md:text-base'>
                      {app.app_name}
                    </h5>
                    <p className='text-xs text-[#6F6F6F]'>
                      {app.app_sub_category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default IntegrationsList;
