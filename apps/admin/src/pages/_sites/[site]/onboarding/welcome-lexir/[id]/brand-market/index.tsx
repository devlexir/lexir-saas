import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import SelectInput from '@components/ui/select-input';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { HandShake } from '@assets/welcome-lexir/formSteps/hand_shake_svg';
import { useOnboardingBrandQuery } from '@data/onboarding-brand/use-onboarding-brand.query';
import { useOnboardingUpdateBrandSingleMutation } from '@data/welcome-form/use-onboarding-brand-update-single.mutation';
import { useStateMachine } from 'little-state-machine';

import updateAction from '../updateAction';

type FormValues = {
  input?: any;
  brand_market?: any;
};

const options = [
  { name: 'Brazil', value: 'Brazil' },
  { name: 'France', value: 'France' },
  { name: 'Portugal', value: 'Portugal' },
  { name: 'United Kingdom', value: 'United Kingdom' },
];
const defaultOptions: any = [];

const BrandMarketStep = () => {
  const router = useRouter();
  const { query } = useRouter();

  const { actions, state } = useStateMachine({ updateAction });

  const { data } = useOnboardingBrandQuery(query.id as string);

  const { mutate: updateOnboardingBrandSingle } =
    useOnboardingUpdateBrandSingleMutation();

  /**
   * Check to see what data is being received by the API request,
   * make a comparison and add it to the "defaultOptions" to serve
   * as the default option of select Input.
   */
  //@ts-ignore
  data?.onboardingInfo?.onboardingBrandCurrentMarkets?.markets.map((market) => {
    switch (market) {
      case market === options[0].value:
        defaultOptions.push('options[0]');
        break;
      case market === options[1].value:
        defaultOptions.push('options[1]');
        break;
      case market === options[2].value:
        defaultOptions.push('options[2]');
        break;
      case market === options[3].value:
        defaultOptions.push('options[3]');
        break;

      default:
        break;
    }
  });

  const {
    handleSubmit,
    register,
    setError,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit({ brand_market }: FormValues) {
    // Initializing a variable
    const brandMarketsArray: any[] = [];
    // Iterating through the array of select input options to build the correct input
    brand_market?.map((market: { value: string }) =>
      brandMarketsArray.push(market?.value)
    );
    brand_market &&
      actions.updateAction({
        onboardingInfo: {
          brand_name: state.onboardingInfo?.brand_name,
          brand_based: state.onboardingInfo?.brand_based,
          brand_market: brandMarketsArray,
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
              onboardingBrandCurrentMarkets: {
                markets: brandMarketsArray,
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
    router.push(`/onboarding/welcome-lexir/${query.id}/brand-website`);
  }

  return (
    <WelcomeLexirFormStep
      step='3/7'
      progress={28}
      title='In which markets you currently sell?'
      subTitle='Which countries you sell your products'
      input={
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className=''>
            <SelectInput
              {...register('brand_market')}
              defaultValue={
                //@ts-ignore
                defaultOptions
              }
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.value}
              placeholder='Type or Select'
              options={options}
              isMulti={true}
            />
          </span>

          <FormButtons isDirty={isDirty} isValid={isValid} />
        </form>
      }
      image={<HandShake className='absolute inset-x-0 top-[30%] z-40 w-full' />}
    />
  );
};

export default BrandMarketStep;
