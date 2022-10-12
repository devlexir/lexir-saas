import { SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Input from '@components/ui/input';
import Radio from '@components/ui/radio/radio';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { WebsiteStep } from '@assets/welcome-lexir/formSteps/website_svg';
import { useOnboardingBrandQuery } from '@data/onboarding-brand/use-onboarding-brand.query';
import { useOnboardingUpdateBrandSingleMutation } from '@data/welcome-form/use-onboarding-brand-update-single.mutation';
import { useStateMachine } from 'little-state-machine';

import updateAction from '../updateAction';

type FormValues = {
  input?: any;
  type?: any;
  radio?: any;
  brand_website?: any;
  brand_website_url?: any;
};

const BrandWebsiteStep = () => {
  const router = useRouter();
  const { query } = useRouter();

  const [radioSelection, setRadioSelection] = useState(false);
  const { actions, state } = useStateMachine({ updateAction });

  const { data } = useOnboardingBrandQuery(query.id as string);

  const { mutate: updateOnboardingBrandSingle } =
    useOnboardingUpdateBrandSingleMutation();

  const {
    handleSubmit,
    register,
    setError,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  function handleClick(radioValue: SetStateAction<boolean>) {
    setRadioSelection(radioValue);
  }

  useEffect(() => {
    //@ts-ignore
    if (data?.onboardingInfo?.onboardingBrandWebsite?.website_url) {
      setRadioSelection(true);
    } else {
      setRadioSelection(false);
    }
  }, []);

  async function onSubmit({ brand_website, brand_website_url }: FormValues) {
    brand_website &&
      actions.updateAction({
        onboardingInfo: {
          brand_name: state.onboardingInfo?.brand_name,
          brand_based: state.onboardingInfo?.brand_based,
          brand_market: state.onboardingInfo?.brand_market,
          brand_website: brand_website,
          brand_website_url: brand_website_url,
          bottles_annually: state.onboardingInfo?.bottles_annually,
          market_begin: state.onboardingInfo?.market_begin,
          type_spirit: state.onboardingInfo?.type_spirit,
          type_wine: state.onboardingInfo?.type_wine,
        },
      });
    updateOnboardingBrandSingle(
      {
        variables: {
          id: data?.id,
          input: {
            onboardingInfo: {
              onboardingBrandWebsite: {
                haveWebsite: brand_website,
                website_url: brand_website_url,
              },
            },
          },
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
    router.push(`/onboarding//welcome-lexir/${query.id}/brand-bottles`);
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
              checked={radioSelection}
              onClick={() => handleClick(true)}
            />

            <Radio
              id='brand_website_no'
              {...register('brand_website')}
              value='no'
              label='No'
              type='radio'
              variant
              checked={!radioSelection}
              onClick={() => handleClick(false)}
            />
          </span>
          {radioSelection === true ? (
            <div className='pt-10'>
              <p className='mb-2 text-base text-[#6F6F6F] md:text-lg'>
                Please provide us the URL of your brand’s website
              </p>
              <Input
                {...register('brand_website_url')}
                defaultValue={
                  //@ts-ignore
                  data?.onboardingInfo?.onboardingBrandWebsite?.website_url
                }
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
