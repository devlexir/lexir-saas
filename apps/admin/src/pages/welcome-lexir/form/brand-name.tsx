import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Input from '@components/ui/input';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { Mixer } from '@assets/welcome-lexir/formSteps/mixer_svg';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

type FormValues = {
  input?: any;
  brand_name?: any;
};

const BrandNameStep = () => {
  const router = useRouter();

  const { actions, state } = useStateMachine({ updateAction });

  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit({ brand_name }: FormValues) {
    actions.updateAction({
      formDetail: {
        brand_name: brand_name,
        brand_based: state.formDetail?.brand_based,
        brand_market: state.formDetail?.brand_market,
        brand_website: state.formDetail?.brand_website,
        brand_website_url: state.formDetail?.brand_website_url,
        bottles_annually: state.formDetail?.bottles_annually,
        market_begin: state.formDetail?.market_begin,
        type_spirit: state.formDetail?.type_spirit,
        type_wine: state.formDetail?.type_wine,
      },
    });
    // console.log(brand_name)
    router.push('/welcome-lexir/form/brand-based');
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
        <Mixer className='absolute inset-x-0 bottom-1/4 z-40 w-60 lg:w-96' />
      }
    />
  );
};

export default BrandNameStep;
