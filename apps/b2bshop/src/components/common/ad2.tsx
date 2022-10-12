import Heading from '@components/ui/heading';

const Ad2 = ({ data, minHeigth = 'min-h-[357px]' }: any) => {
  const { title, sub_title, background_image } = data;
  return (
    <div
      className={`h-full w-full bg-cover bg-center sm:w-5/12 ${minHeigth}`}
      style={{
        backgroundImage: `url('${background_image}')`,
      }}
    >
      <div className='flex h-full min-h-[357px] flex-col justify-between p-4 sm:py-6 sm:px-10'>
        <div>
          <h3 className='max-w-[250px] text-base font-bold uppercase leading-8 text-[#DBDCBA]'>
            {sub_title}
          </h3>
          <Heading variant='adHeading' className='max-w-[250px]'>
            {title}
          </Heading>
        </div>

        {/* <div className='flex justify-end'>
          {data && (
            <Button
              // Tailwind does not recognize the styles passed in the per object sometimes
              style={{
                backgroundColor: colors.primary_color,
                color: colors.secondary_color,
              }}
              variant='adButton'
            >
              {button_text}
            </Button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Ad2;
