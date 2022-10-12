import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import SelectInput from '@components/ui/select-input';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { MappaMundi } from '@assets/welcome-lexir/formSteps/mappa_mundi_svg';
import { useOnboardingBrandQuery } from '@data/onboarding-brand/use-onboarding-brand.query';
import { useOnboardingUpdateBrandSingleMutation } from '@data/welcome-form/use-onboarding-brand-update-single.mutation';
import { useStateMachine } from 'little-state-machine';

import updateAction from '../updateAction';

type FormValues = {
  input?: any;
  brand_based?: any;
};

const options = [
  { name: 'Brazil', value: 'Brazil' },
  { name: 'France', value: 'France' },
  { name: 'Portugal', value: 'Portugal' },
  { name: 'United Kingdom', value: 'United Kingdom' },
];

const BrandBasedStep = () => {
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
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit({ brand_based }: FormValues) {
    brand_based &&
      actions.updateAction({
        onboardingInfo: {
          brand_name: state.onboardingInfo?.brand_name,
          brand_based: brand_based.value,
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
              onboardingBrandCountryInfo: {
                country: brand_based.value,
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
    router.push(`/onboarding/welcome-lexir/${query.id}/brand-market`);
  }

  return (
    <WelcomeLexirFormStep
      step='2/7'
      progress={14}
      title='Where is your brand based?'
      subTitle='Please provide us your brand’s country'
      input={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className=''>
              <SelectInput
                {...register('brand_based')}
                defaultInputValue={
                  //@ts-ignore
                  data?.onboardingInfo?.onboardingBrandCountryInfo?.country
                }
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.value}
                placeholder='Type or Select'
                options={options}
              />
            </span>
            <FormButtons isDirty={isDirty} isValid={isValid} />
          </form>
        </>
      }
      image={
        <MappaMundi className='absolute inset-x-0 top-[35%] z-40 w-full' />
      }
    />
  );
};

export default BrandBasedStep;
