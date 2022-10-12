const CreatePageHeader = ({ title, subTitle }: any) => {
  return (
    <div className='flex content-center justify-between bg-[#F9F9F9] sm:h-36 lg:fixed lg:top-[72px] lg:z-[30] lg:h-[180px] lg:w-full lg:border-b-2 lg:border-l-2 lg:border-gray-100 lg:px-4'>
      <div className='mt-4 mb-6 mr-4 w-full flex-col justify-between sm:flex '>
        <span className='text-32 font-bold text-gray-700 lg:pt-[38px]'>
          {title}
        </span>
        <div className='flex items-center justify-between'>
          <div className='w-60 '>
            <span className=' text-20 font-bold text-gray-600'>{subTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePageHeader;
