import ProductReviewRating from './product-review-rating';
import Heading from '@components/ui/heading';
import { Tab } from '@headlessui/react';
import { useState } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsTab() {
  let [tabHeading] = useState({
    Product_Details: '',
  });

  return (
    <div className='w-full py-11 sm:px-0 lg:py-14 xl:px-2 xl:py-16'>
      <Tab.Group>
        <Tab.List className='block border-b border-border-base'>
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                classNames(
                  'lg:text-17px relative inline-block pb-3 text-15px leading-5 text-brand-dark transition-all hover:text-brand focus:outline-none ltr:mr-8 rtl:ml-8 lg:pb-5',
                  selected
                    ? 'font-semibold after:absolute after:bottom-0 after:h-0.5 after:w-full after:translate-y-[1px] after:bg-brand after:ltr:left-0 after:rtl:right-0'
                    : ''
                )
              }
            >
              {item.split('_').join(' ')}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-6 lg:mt-9'>
          <Tab.Panel className='lg:flex'>
            <div className='space-y-4 text-sm leading-[2em] text-brand-muted sm:text-15px lg:space-y-5 xl:space-y-7'>
              <p>
                Typography is the work of typesetters, compositors,
                typographers, graphic designers, art directors, manga artists,
                comic book artists, graffiti artists, and now—anyone who
                arranges words, letters, numbers, and symbols for publication,
                display, or distribution—from clerical workers and newsletter
                writers to anyone self-publishing materials.
              </p>
              <p>
                Hit your next boxing workout with a combination it’s never seen
                before in the Combat Drop Arm Tank, including a
                freedom-instilling regular fit and dropped armhole to allow you
                to throw jabs and hooks at the punching bag with ease. A
                lightweight material keeps you fighting fit, and fresh.
              </p>
            </div>
            <div className='shrink-0 pt-5 lg:w-[400px] lg:pt-0 lg:ltr:pl-10 lg:rtl:pr-10 xl:w-[480px] xl:ltr:pl-14 xl:rtl:pr-14 2xl:w-[550px] 2xl:ltr:pl-20 2xl:rtl:pr-20 3xl:w-[680px]'>
              <Heading
                variant='mediumHeading'
                className='mb-4 pt-0.5 xl:text-lg'
              >
                Nutrition Facts
              </Heading>
              <div className='rounded border border-border-four'>
                <table className='w-full text-15px text-brand-dark'>
                  <thead>
                    <tr className='border-b border-border-four'>
                      <th className='px-4 pt-3 pb-4 text-sm font-medium ltr:text-left rtl:text-right lg:px-5 lg:pb-6 lg:text-15px xl:px-6 xl:text-base'>
                        Amount per serving
                        <span className='block pt-0.5 text-lg font-semibold lg:text-xl xl:text-2xl'>
                          Calories
                        </span>
                      </th>
                      <th className='border-s w-24 border-border-four px-4 pt-3 pb-5 text-2xl font-semibold ltr:text-right rtl:text-left lg:w-28 lg:px-5 lg:text-3xl xl:w-36 xl:px-6 xl:text-[36px]'>
                        70
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-border-four font-normal last:border-b-0'>
                      <td className='px-4 py-3 lg:px-5 xl:px-6'>
                        Total Fat 5g
                      </td>
                      <td className='border-s w-24 border-border-four px-4 py-3 ltr:text-right rtl:text-left lg:w-28 lg:px-5 xl:w-36 xl:px-6'>
                        6%
                      </td>
                    </tr>
                    <tr className='border-b border-border-four font-normal last:border-b-0'>
                      <td className='px-4 py-3 lg:px-5 xl:px-6'>
                        Cholesterol 185mg
                      </td>
                      <td className='border-s w-24 border-border-four px-4 py-3 ltr:text-right rtl:text-left lg:w-28 lg:px-5 xl:w-36 xl:px-6'>
                        62%
                      </td>
                    </tr>
                    <tr className='border-b border-border-four font-normal last:border-b-0'>
                      <td className='px-4 py-3 lg:px-5 xl:px-6'>Sodium 70mg</td>
                      <td className='border-s w-24 border-border-four px-4 py-3 ltr:text-right rtl:text-left lg:w-28 lg:px-5 xl:w-36 xl:px-6'>
                        49%
                      </td>
                    </tr>
                    <tr className='border-b border-border-four font-normal last:border-b-0'>
                      <td className='px-4 py-3 lg:px-5 xl:px-6'>
                        Total Carbohydrate 0g
                      </td>
                      <td className='border-s w-24 border-border-four px-4 py-3 ltr:text-right rtl:text-left lg:w-28 lg:px-5 xl:w-36 xl:px-6'>
                        18%
                      </td>
                    </tr>
                    <tr className='border-b border-border-four font-normal last:border-b-0'>
                      <td className='px-4 py-3 lg:px-5 xl:px-6'>Protein 6g</td>
                      <td className='border-s w-24 border-border-four px-4 py-3 ltr:text-right rtl:text-left lg:w-28 lg:px-5 xl:w-36 xl:px-6'>
                        35%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
