import Link from 'next/link';

const CardWelcomeLexir = ({ image, title, text, link }: any) => {
  return (
    <Link href={link || '/'}>
      <a
        target={'_blank'}
        className='flex w-48 cursor-pointer items-end rounded-lg bg-white py-4 px-2 text-[#6F6F6F] shadow-[0_4px_15px_-0px_rgba(0,0,0,0.04)] hover:shadow-lg sm:p-5 lg:w-80 lg:p-10'
      >
        <div className='flex flex-col items-center justify-center gap-y-4 align-middle'>
          <span className=''>{image}</span>
          <h2 className='pt-2 text-center text-xs font-bold text-[#2D2D2D] lg:text-xl'>
            {title}
          </h2>
          <p className=' text-center text-[8px] leading-tight  lg:text-sm'>
            {text}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default CardWelcomeLexir;
