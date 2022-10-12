import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Radio from '@components/ui/radio/radio';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormStep from '@components/welcome-lexir/form/form-step';

import { BottlesSvg } from '@assets/welcome-lexir/formSteps/bottles_svg';
import { useStateMachine } from 'little-state-machine';

import updateAction from './updateAction';

type FormValues = {
  input?: any;
  bottles_annually?: any;
};

const BrandWebsiteStep = () => {
  const router = useRouter();

  const { actions, state } = useStateMachine({ updateAction });

  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit({ bottles_annually }: FormValues) {
    bottles_annually &&
      actions.updateAction({
        formDetail: {
          brand_name: state.formDetail?.brand_name,
          brand_based: state.formDetail?.brand_based,
          brand_market: state.formDetail?.brand_market,
          brand_website: state.formDetail?.brand_website,
          brand_website_url: state.formDetail?.brand_website_url,
          bottles_annually: bottles_annually,
          market_begin: state.formDetail?.market_begin,
          type_spirit: state.formDetail?.type_spirit,
          type_wine: state.formDetail?.type_wine,
        },
      });
    router.push('/welcome-lexir/form/brand-market-begin');
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
