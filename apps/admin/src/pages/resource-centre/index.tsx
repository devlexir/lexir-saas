import Link from 'next/link';

import FooterBrandsLexir from '@components/brands-lexir/footer-brands-lexir';
import NavbarBrandsLexir from '@components/brands-lexir/navbar-brands-lexir';
import CardWelcomeLexir from '@components/welcome-lexir/card-welcome-lexir';

import { FaqIcon } from '@assets/resource-centre/tutorial-icon';
import { BookIcon } from '@assets/welcome-lexir/book-icon';
import { ResourcesIcon } from '@assets/welcome-lexir/resources-icon';

const cardsData = [
  {
    image: <BookIcon className='h-16 lg:h-24' />,
    title: 'How Does Lexir Work?',
    text: 'A quick overview of everything you need to know about Lexir’s platform',
    link: 'https://lexir.notion.site/How-Does-Lexir-Work-d5041a7bbb334f8aa05458950a72753d',
  },
  {
    image: <ResourcesIcon className='h-11 lg:h-20' />,
    title: 'How to get Started',
    text: 'A step by step guide on how you can launch and grow your brand with Lexir',
    link: 'https://lexir.notion.site/How-to-get-started-with-Lexir-1737af7c9b0b4b7d98353adcb1792f05',
  },
  {
    image: <FaqIcon className='h-14 lg:h-24' />,
    title: 'FAQ',
    text: 'A list of commonly asked questions and answers about Lexir',
    link: 'https://lexir.notion.site/FAQ-Lexir-for-Brands-017eb13beecf4e8ab33cbed616e1608c',
  },
];

const ResourceCenter = () => {
  return (
    <>
      <div className='flex h-screen min-h-min w-full flex-col'>
        <div className='flex justify-center px-5'>
          <NavbarBrandsLexir />
        </div>
        <div className='z-30 flex h-full min-h-[336px] w-full justify-center px-6 shadow-[0_4px_15px_-0px_rgba(0,0,0,0.04)]'>
          <div className='flex w-full max-w-md flex-col items-center justify-center lg:pt-0'>
            <h2 className='mb-4 mt-4 flex items-center gap-x-2 text-center font-Source_Serif_Pro text-[34px] font-bold text-[#2D2D2D] md:text-5xl'>
              Resource Centre
            </h2>

            <span className='text-center text-base text-[#6F6F6F] md:text-lg'>
              A few helpful resources to learn more about Lexir
            </span>
          </div>
        </div>
        <div className='flex  min-h-min w-full flex-col items-center justify-center bg-[#F9F9F9] pb-14'>
          <div className='flex h-full min-h-min flex-col justify-center gap-x-4 gap-y-4 pt-20 pb-14 sm:flex-row '>
            {cardsData.map((card) => (
              <CardWelcomeLexir
                image={card.image}
                title={card.title}
                text={card.text}
                link={card.link}
              />
            ))}
          </div>
          <div className='px-5 text-center text-[13px] text-[#6F6F6F] md:text-base'>
            If you have any questions, please reach out at{' '}
            <Link href='mailto:cheers@lexir.com'>
              <a className='font-bold'> cheers@lexir.com</a>
            </Link>
          </div>
        </div>

        <div className='bottom-0 w-full'>
          <FooterBrandsLexir />
        </div>
      </div>
    </>
  );
};

export default ResourceCenter;
