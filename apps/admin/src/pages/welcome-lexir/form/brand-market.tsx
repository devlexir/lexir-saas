import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import SelectInput from '@components/ui/select-input';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { HandShake } from '@assets/welcome-lexir/formSteps/hand_shake_svg';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

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
const BrandMarketStep = () => {
  const router = useRouter();

  const { actions, state } = useStateMachine({ updateAction });

  const {
    handleSubmit,
    register,
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
        formDetail: {
          brand_name: state.formDetail?.brand_name,
          brand_based: state.formDetail?.brand_based,
          brand_market: brandMarketsArray,
          brand_website: state.formDetail?.brand_website,
          brand_website_url: state.formDetail?.brand_website_url,
          bottles_annually: state.formDetail?.bottles_annually,
          market_begin: state.formDetail?.market_begin,
          type_spirit: state.formDetail?.type_spirit,
          type_wine: state.formDetail?.type_wine,
        },
      });
    router.push('/welcome-lexir/form/brand-website');
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
      image={<HandShake className='absolute inset-x-0 top-[35%] z-40 w-full' />}
    />
  );
};

export default BrandMarketStep;
