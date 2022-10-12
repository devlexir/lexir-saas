import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Radio from '@components/ui/radio/radio';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { BottlesSvg } from '@assets/welcome-lexir/formSteps/bottles_svg';
import { useOnboardingBrandQuery } from '@data/onboarding-brand/use-onboarding-brand.query';
import { useOnboardingUpdateBrandSingleMutation } from '@data/welcome-form/use-onboarding-brand-update-single.mutation';
import { useStateMachine } from 'little-state-machine';

import updateAction from '../updateAction';

type FormValues = {
  input?: any;
  bottles_annually?: any;
};

const BrandWebsiteStep = () => {
  const router = useRouter();
  const { query } = useRouter();

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

  async function onSubmit({ bottles_annually }: FormValues) {
    bottles_annually &&
      actions.updateAction({
        onboardingInfo: {
          brand_name: state.onboardingInfo?.brand_name,
          brand_based: state.onboardingInfo?.brand_based,
          brand_market: state.onboardingInfo?.brand_market,
          brand_website: state.onboardingInfo?.brand_website,
          brand_website_url: state.onboardingInfo?.brand_website_url,
          bottles_annually: bottles_annually,
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
              onboardingBrandBottleSalesQuantity: {
                qty_bracket: bottles_annually,
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
    router.push(`/onboarding/welcome-lexir/${query.id}/brand-market-begin`);
  }

  return (
    <WelcomeLexirFormStep
      step='5/7'
      progress={56}
      title='How many bottles do you sell annually?'
      subTitle=''
      input={
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className=''>
            <Radio
              id='yes'
              {...register('bottles_annually')}
              type='radio'
              value='0 - 5.000'
              label='0 - 5.000'
              variant
              className='mb-4'
            />
            <Radio
              id='no'
              {...register('bottles_annually')}
              type='radio'
              value='5.000 - 20.000'
              label='5.000 - 20.000'
              variant
              className='mb-4'
            />
            <Radio
              id='yes'
              {...register('bottles_annually')}
              type='radio'
              value='20.000 - 50.000'
              label='20.000 - 50.000'
              variant
              className='mb-4'
            />
            <Radio
              id='no'
              {...register('bottles_annually')}
              type='radio'
              value='> 50.000'
              label='> 50.000'
              variant
              className='mb-4'
            />
          </span>

          <FormButtons isDirty={isDirty} isValid={isValid} />
        </form>
      }
      image={
        <BottlesSvg className='absolute inset-x-0 top-[27%] z-40 w-full' />
      }
    />
  );
};

export default BrandWebsiteStep;
