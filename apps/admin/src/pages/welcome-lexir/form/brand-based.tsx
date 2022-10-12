import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import SelectInput from '@components/ui/select-input';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { MappaMundi } from '@assets/welcome-lexir/formSteps/mappa_mundi_svg';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

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
  const { actions, state } = useStateMachine({ updateAction });

  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit({ brand_based }: FormValues) {
    brand_based &&
      actions.updateAction({
        formDetail: {
          brand_name: state.formDetail?.brand_name,
          brand_based: brand_based.value,
          brand_market: state.formDetail?.brand_market,
          brand_website: state.formDetail?.brand_website,
          brand_website_url: state.formDetail?.brand_website_url,
          bottles_annually: state.formDetail?.bottles_annually,
          market_begin: state.formDetail?.market_begin,
          type_spirit: state.formDetail?.type_spirit,
          type_wine: state.formDetail?.type_wine,
        },
      });
    router.push('/welcome-lexir/form/brand-market');
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
