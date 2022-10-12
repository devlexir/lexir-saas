import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Input from '@components/ui/input';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { Mixer } from '@assets/welcome-lexir/formSteps/mixer_svg';
import { useOnboardingBrandQuery } from '@data/onboarding-brand/use-onboarding-brand.query';
import { useOnboardingUpdateBrandSingleMutation } from '@data/welcome-form/use-onboarding-brand-update-single.mutation';
import { useStateMachine } from 'little-state-machine';

import updateAction from '../updateAction';

type FormValues = {
  input?: any;
  brand_name?: any;
};
const BrandNameStep = () => {
  const router = useRouter();
  const { query } = useRouter();

  const { data } = useOnboardingBrandQuery(query.id as string);

  const { mutate: updateOnboardingBrandSingle } =
    useOnboardingUpdateBrandSingleMutation();

  const { actions, state } = useStateMachine({ updateAction });

  const {
    handleSubmit,
    setError,
    register,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit({ brand_name }: FormValues) {
    actions.updateAction({
      onboardingInfo: {
        brand_name: brand_name,
        brand_based: state.onboardingInfo?.brand_based,
        brand_market: state.onboardingInfo?.brand_market,
        brand_website: state.onboardingInfo?.brand_website,
        brand_website_url: state.onboardingInfo?.brand_website_url,
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
              onboardingBrandNameInfo: {
                brand_name: brand_name,
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
    console.log(brand_name);
    router.push(`/onboarding/welcome-lexir/${query.id}/brand-based`);
  }

  return (
    <WelcomeLexirFormStep
      step='1/7'
      progress={0}
      title='What is your brand’s name?'
      subTitle='Please provide us your brand’s name'
      input={
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className=''>
            <Input
              {...register('brand_name', {
                required: true,
              })}
              defaultValue={
                //@ts-ignore
                data?.onboardingInfo?.onboardingBrandNameInfo?.brand_name
              }
              type='text'
              variant='outline'
              className='mb-4'
              placeholder='Lexir Inc.,'
            />
          </span>
          <FormButtons isDirty={isDirty} isValid={isValid} />
        </form>
      }
      image={
        <Mixer className='absolute inset-x-0 top-[35%] z-40 w-60 lg:w-96' />
      }
    />
  );
};

export default BrandNameStep;
