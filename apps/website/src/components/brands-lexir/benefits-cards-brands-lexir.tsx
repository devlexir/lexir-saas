// ** SVGs ** //
import { BenefitImgArrow } from '@assets/brands-lexir/benefit_img_arrow';
import { BenefitImgFeather } from '@assets/brands-lexir/benefit_img_feather';
import { BenefitImgOmnichannel } from '@assets/brands-lexir/benefit_img_omnichannel';

// * * DATA FOR CARDS * * //
const benefitCards = [
  {
    img: <BenefitImgArrow />,
    title: 'The Right Margin Profile',
    text: 'Keep more of your margin and control your pricing with a direct supply chain',
  },
  {
    img: <BenefitImgFeather />,
    title: 'More Control over Your Brand',
    text: 'Communicate your brand and product stories to keep your clients and customers engaged',
  },
  {
    img: <BenefitImgOmnichannel />,
    title: 'Omnichannel Distribution',
    text: 'Fulfill any and all orders, large or small, no matter what channel they come from',
  },
];

const BenefitsCardsSection = () => {
  return (
    <div className='flex w-full justify-center bg-[#f9f9f9] sm:my-24'>
      <div className='flex h-full w-full max-w-[1920px] flex-col items-center justify-center gap-y-12 py-20 px-5 md:grid md:grid-cols-3 md:gap-y-0 md:gap-x-12 md:px-10 lg:gap-x-24 lg:px-20 xl:gap-x-48'>
        {benefitCards.map((benefitCard) => (
          <div className='flex max-w-[375px] flex-col items-center justify-center text-center text-[#2d2d2d] sm:items-start sm:text-left'>
            {benefitCard.img}
            <div className='mb-3 mt-4 max-w-[325px]  font-Source_Serif_Pro text-3xl font-semibold'>
              {benefitCard.title}
            </div>
            <div className='text-lg leading-relaxed '>{benefitCard.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsCardsSection;
