import { useState } from 'react';

import Image from 'next/image';

import { TagIcon } from '@components/icons/sidebar';

import chevronDown from '@assets/marketDropdownAssets/Vector-down.png';
import okVector from '@assets/marketDropdownAssets/Vector-ok.png';
import locationVectorRigth from '@assets/marketDropdownAssets/Vector-rigth.png';
import chevronUp from '@assets/marketDropdownAssets/Vector-up.png';
import { GlobalIcon } from '@assets/marketDropdownAssets/global-icon';

const BrandsDropdown = () => {
  const [selectedOption, setSelectedOption] = useState<any>('');
  const [isOpen, setIsOpen] = useState(false);

  const onOptionClicked = (value: any) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  let options = [];

  options = data?.brands.data.map((brand: any) => {
    brand.label = brand.brand_name;
    brand.value = brand.brand_id;
    return brand;
  });

  return (
    <div className='flex flex-col w-full relative'>
      <div
        className='z-30 flex flex-row bg-gray-200 h-14 border border-neutral-200 
        rounded-xl shadow-sm justify-evenly '
        onClick={() => {}}
      >
        {/* Conditional to check if the dropdown is open or closed, modifying the main field with different styles */}
        {isOpen ? (
          <div className='w-full flex flex-row justify-evenly border-r-4 border-[rgb(28,140,100)] rounded'>
            <div className='mx-4 my-4 flex items-center'>
              <TagIcon />
            </div>
            <p className='-ml-8 mt-4 text-base font-medium text-[#1C8C64]'>
              {selectedOption['value'] || 'All Brands'}
            </p>
            {/* Conditional to check if there is an option selected to render the country flag */}
            {selectedOption && (
              <div className='flex flex-col mt-4 align-middle'>
                {selectedOption['image']}
              </div>
            )}
            <div className='flex flex-col mt-6 align-middle'>
              <Image src={chevronUp} alt='Picture of a chevron' />
            </div>
          </div>
        ) : (
          <>
            {selectedOption ? (
              <div className='mx-4 my-4'>
                <GlobalIcon />
              </div>
            ) : (
              <div className='mx-4 my-4 flex items-center'>
                <TagIcon />
              </div>
            )}
            <p className='-ml-6 flex items-center text-base text-[#4F4F4F]'>
              {selectedOption['value'] || 'All Brands'}
            </p>
            {/* Conditional to check if there is an option selected to render the country flag */}
            {selectedOption && (
              <div className='flex flex-col mt-4 align-middle'>
                {selectedOption['image']}
              </div>
            )}
            {/* Conditional to check if something has already been selected. If it has, leave the Chevron lying around */}
            {selectedOption ? (
              <div className='flex flex-col mt-5 mr align-middle'>
                <Image src={locationVectorRigth} alt='Picture of a chevron' />
              </div>
            ) : (
              <div className='flex flex-col h-2 w-4 mt-6 align-middle '>
                <Image src={chevronDown} alt='Picture of a chevron' />
              </div>
            )}
          </>
        )}
      </div>
      {/* Conditional to check if the div has been clicked. If it was, it renders the country listing */}
      {isOpen && (
        <div className='w-full absolute top-14'>
          <ul className='z-40 flex flex-col align-middle justify-center shadow'>
            {options.length > 0 &&
              options.map((option) => (
                <>
                  {/* Conditional to check during listing if the item was selected before, if yes, render differently */}
                  {selectedOption['value'] === option['value'] ? (
                    <li
                      className='grid grid-cols-3 items-center 
                  bg-[#E0F3ED] h-14 border hover:bg-[#F9F9F9] w-full'
                      onClick={onOptionClicked(option)}
                    >
                      <div className='flex align-middle'>{option.label}</div>
                      <div className='flex align-middle '>
                        <Image src={okVector} alt='OK signe' />
                      </div>
                    </li>
                  ) : (
                    <li
                      className='grid grid-cols-3 items-center
                    bg-white h-14 border hover:bg-[#F9F9F9]'
                      onClick={onOptionClicked(option)}
                    >
                      <div className='flex  align-middle'>{option.label}</div>
                    </li>
                  )}
                </>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrandsDropdown;
