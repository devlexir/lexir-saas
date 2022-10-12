import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Input from '@components/ui/input';
import Radio from '@components/ui/radio/radio';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { WebsiteStep } from '@assets/welcome-lexir/formSteps/website_svg';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

type FormValues = {
  input?: any;
  type?: any;
  radio?: any;
  brand_website?: any;
  brand_website_url?: any;
};

const BrandWebsiteStep = () => {
  const router = useRouter();

  const [radioSelection, setRadioSelection] = useState('no');
  const { actions, state } = useStateMachine({ updateAction });

  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  function handleClick(radioValue: SetStateAction<string>) {
    setRadioSelection(radioValue);
  }

  async function onSubmit({ brand_website, brand_website_url }: FormValues) {
    brand_website &&
      actions.updateAction({
        formDetail: {
          brand_name: state.formDetail?.brand_name,
          brand_based: state.formDetail?.brand_based,
          brand_market: state.formDetail?.brand_market,
          brand_website: brand_website,
          brand_website_url: brand_website_url,
          bottles_annually: state.formDetail?.bottles_annually,
          market_begin: state.formDetail?.market_begin,
          type_spirit: state.formDetail?.type_spirit,
          type_wine: state.formDetail?.type_wine,
        },
      });
    router.push('/welcome-lexir/form/brand-bottles');
  }

  return (
    <WelcomeLexirFormStep
      step='4/7'
      progress={42}
      title='Does your brand have a website?'
      input={
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className=''>
            <Radio
              id='brand_website_yes'
              {...register('brand_website')}
              value='yes'
              label='Yes'
              className='mb-4'
              type='radio'
              variant
              onClick={() => handleClick('yes')}
            />

            <Radio
              id='brand_website_no'
              {...register('brand_website')}
              value='no'
              label='No'
              type='radio'
              variant
              onClick={() => handleClick('no')}
            />
          </span>
          {radioSelection === 'yes' ? (
            <div className='pt-10'>
              <p className='mb-2 text-base text-[#6F6F6F] md:text-lg'>
                Please provide us the URL of your brand’s website
              </p>
              <Input
                {...register('brand_website_url')}
                type='text'
                variant='outline'
                className='mb-4'
                placeholder='Type the URL'
              />
            </div>
          ) : null}

          <FormButtons isDirty={isDirty} isValid={isValid} />
        </form>
      }
      image={
        <WebsiteStep className='absolute inset-x-0 top-[25%] z-40 w-full' />
      }
    />
  );
};

export default BrandWebsiteStep;
