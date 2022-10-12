import { ArrowRotate } from '@assets/brands-lexir/arrow_rotate';
import { Disclosure, Transition } from '@headlessui/react';

import AnimationWrapper from '@utils/motion/landing-page-animantion';
import React from 'react';

// * * FAKE DATA * * //
const faqs = [
  {
    title: 'What markets does Lexir operate in?',
    text: 'Lexir currently operates all over continental France, the UK, and Portugal, with Spain, Italy, Germany, and the Netherlands coming soon.',
  },
  {
    title: 'What types of brands does Lexir work with?',
    text: 'Lexir works with unique and original brands, who create quality craft spirits and wine with interesting stories behind them. We want to know about the people who made them and the passion that went into them!',
  },
  {
    title: 'Does Lexir help me import and distribute products?',
    text: 'Yes, Lexir imports products from all over the world, and distributes them across a range of European countries, with more on the horizon.',
  },
  {
    title: "Who are Lexir's clients?",
    text: 'Lexir works with a wide range of clients – direct consumers; on-trade hospitality businesses like bars, restaurants and hotels; and off-trade outlets like cavistes, boutiques, and small and large chains.',
  },
  {
    title: 'How do I get started?',
    text: 'Easy – just fill in the form on this page with a few of your details, and we’ll get back to you within a day or two. If we think there is a mutual fit, we’ll work together with you to define your desired markets and prices to help you start selling. Each solution is individually tailored to you.',
  },
];

const FaqSection = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='flex min-h-fit w-full max-w-7xl flex-col gap-x-24 sm:px-5 md:px-10 lg:px-20 xl:gap-x-48'>
        <div className='flex w-full flex-col items-center '>
          <AnimationWrapper>
            <h2 className='mb-10 flex justify-center gap-x-2 text-left font-Source_Serif_Pro text-3xl font-bold text-[#2d2d2d] sm:text-center'>
              Frequently Asked Questions
            </h2>
          </AnimationWrapper>
          <div className='w-full pt-4 sm:px-4'>
            <div className='w-full rounded-2xl'>
              {faqs.map((faq, index) => (
                <React.Fragment key={index}>
                  <AnimationWrapper>
                    <Disclosure
                      as='div'
                      className='mt-2 w-full border-b md:mt-8'
                    >
                      {({ open }) => (
                        <>
                          <Disclosure.Button className='flex w-full cursor-pointer items-center justify-between gap-x-2 rounded-lg bg-transparent pt-2 pb-4 text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75'>
                            <span className='text-xl font-semibold tracking-[0.7px]'>
                              {faq.title}
                            </span>
                            <div className='w-4'>
                              <ArrowRotate
                                className={`${
                                  open ? 'rotate-180 transform' : ''
                                } h-5 w-5`}
                              />
                            </div>
                          </Disclosure.Button>
                          <Transition
                            enter='transition duration-200 ease-in-out		'
                            enterFrom='-translate-y-4 opacity-0'
                            enterTo='translate opacity-100'
                            leave='transition duration-200 ease-in-out	'
                            leaveFrom='translate opacity-100'
                            leaveTo='-translate-y-4 opacity-0'
                          >
                            <Disclosure.Panel className='text-md w-full pb-4 md:text-lg '>
                              {faq.text}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  </AnimationWrapper>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
