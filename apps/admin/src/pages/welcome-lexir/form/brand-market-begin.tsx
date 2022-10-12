import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { FranceFlag } from '@assets/marketDropdownAssets/france-flag';
import { PortugalFlag } from '@assets/marketDropdownAssets/portugal-flag';
import { UkFlag } from '@assets/welcome-lexir/formSteps/uk-flag-svg';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

type FormValues = {
  input?: any;
  selectedCountry: string;
  market_begin?: any;
};

const countriesOptions = [
  {
    flag: <UkFlag className='h-14 w-24 xl:h-32 xl:w-64' />,
    countryName: 'UK',
  },
  {
    flag: <FranceFlag className='h-14 w-24 xl:h-32 xl:w-64' />,
    countryName: 'France',
  },
  {
    flag: <PortugalFlag className='h-14 w-24 xl:h-32 xl:w-64' />,
    countryName: 'Portugal',
  },
];

const BrandMarketBeginStep = () => {
  const { actions, state } = useStateMachine({ updateAction });

  const [selectedCountry, setSelectedCoutry] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit() {
    selectedCountry &&
      actions.updateAction({
        formDetail: {
          brand_name: state.formDetail?.brand_name,
          brand_based: state.formDetail?.brand_based,
          brand_market: state.formDetail?.brand_market,
          brand_website: state.formDetail?.brand_website,
          brand_website_url: state.formDetail?.brand_website_url,
          bottles_annually: state.formDetail?.bottles_annually,
          market_begin: selectedCountry,
          type_spirit: state.formDetail?.type_spirit,
          type_wine: state.formDetail?.type_wine,
        },
      });
    router.push('/welcome-lexir/form/brand-market-products');
  }

  function handleSelection(name: string) {
    setSelectedCoutry(name);
    setIsDirty(true);
  }

  return (
    <WelcomeLexirFormStep
      step='6/7'
      progress={84}
      title='In which market would you like to begin?'
      input={
        <>
          <span className='mt-4 flex  flex-col items-center gap-4 md:flex-row'>
            {countriesOptions.map((country) => (
              <button onClick={() => handleSelection(country.countryName)}>
                <div
                  className={`flex h-28 w-48 cursor-pointer items-center justify-center rounded-lg ${
                    selectedCountry === country.countryName
                      ? 'border-4 border-[#1C8C64] bg-[#F9F9F9]'
                      : 'border border-[#CCCCCC] bg-white'
                  } p-4 hover:shadow-lg active:bg-[#1C8C64] xl:h-56 xl:w-96`}
                >
                  <span className='flex flex-col items-center gap-y-2 align-middle'>
                    <span>{country.flag}</span>
                    <span className=' text-base font-bold text-[#6F6F6F] xl:text-xl'>
                      {country.countryName}
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              value={selectedCountry}
              type='hidden'
              {...register('market_begin')}
            />
            <FormButtons isDirty={isDirty} isValid={isValid} />
          </form>
        </>
      }
    />
  );
};

export default BrandMarketBeginStep;
