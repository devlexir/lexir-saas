import { useModalAction } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import CloseButton from '@components/ui/close-button';
import { FormCheckBox } from '@components/ui/form/form-checkbox';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import Logo from '@components/ui/logo';
import {
  useSignUpMutation,
  SignUpInputType,
} from '@framework/basic-rest/auth/use-signup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
  formOptions?: any;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  isPopup = true,
  className,
}) => {
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Company Name is required'),
    email: Yup.string().email().required('Email address is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    terms_of_service: Yup.boolean()
      .oneOf(
        [true],
        'Please, agree with the Privacy Policy and Terms of Service'
      )
      .required('Please, agree with the Privacy Policy and Terms of Service'),
    legal_age: Yup.boolean()
      .oneOf([true], 'Please, agree with the minimal age policy')
      .required('Please, agree with the minimal age policy'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpInputType>({ mode: 'onChange', ...formOptions });

  function onSubmit({
    name,
    email,
    password,
    remember_me,
    confirm_password,
    terms_of_service,
    legal_age,
  }: SignUpInputType) {
    closeModal();
  }
  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }

  return (
    <div className='flex rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]'>
      <CloseButton onClick={closeModal} />
      <div className='flex w-full rounded-lg bg-brand-light'>
        <div className='registration relative hidden md:block md:w-1/2 lg:w-[55%] xl:w-[60%]'>
          <Image
            src='/assets/images/login.jpeg'
            alt='sign up Image'
            layout='fill'
          />
        </div>
        <div className='flex w-full flex-col justify-center rounded-md py-6 px-4 sm:py-10 sm:px-8 md:w-1/2 md:px-6 lg:w-[45%] lg:px-10 xl:w-[40%] '>
          <div className='text-center'>
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className='mt-4 text-xl font-bold uppercase text-brand-dark sm:text-[22px] sm:leading-8'>
              {'Welcome to lexir'}
            </h4>
            <div className='mt-4 text-center text-base text-black'>
              {'Already Registered?'}
              <button
                type='button'
                className='text-sm text-brand hover:no-underline focus:outline-none ltr:ml-1 rtl:mr-1 sm:text-base'
                onClick={handleSignIn}
              >
                {'Sign In'}
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mt-10 flex flex-col justify-center'
            noValidate
          >
            <div className='flex flex-col'>
              <div className='flex flex-col space-y-5'>
                <Input
                  label={'Business Name'}
                  placeholder='Enter the Business Name'
                  type='text'
                  variant='solid'
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Missing fields',
                    },
                  })}
                  error={errors.name?.message}
                />
                <Input
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  variant='solid'
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Missing fields',
                    },
                  })}
                  error={errors.email?.message}
                />
                <PasswordInput
                  label={'Password'}
                  placeholder='Enter your password'
                  error={errors.password?.message}
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Missing fields',
                    },
                  })}
                />
                <PasswordInput
                  label={'Confirm Password'}
                  placeholder='Confirm your password'
                  error={errors.confirm_password?.message}
                  {...register('confirm_password', {
                    required: {
                      value: true,
                      message: 'Missing fields',
                    },
                  })}
                />
              </div>
              <div className='mt-14 flex items-center justify-start'>
                <div className=' flex flex-col items-start'>
                  <FormCheckBox
                    label={
                      <div className='text-heading text-xs focus:text-brand-dark focus:outline-none'>
                        {'I agree to Lexir’s '}
                        <Link href={ROUTES.PRIVACY}>
                          <a
                            onClick={closeModal}
                            className='underline hover:text-brand-dark hover:no-underline'
                          >
                            {'Privacy Policy'}
                          </a>
                        </Link>
                        {' and '}
                        <Link href={ROUTES.TERMS}>
                          <a
                            onClick={closeModal}
                            className='underline hover:text-brand-dark hover:no-underline'
                          >
                            {'Terms of Service'}
                          </a>
                        </Link>
                      </div>
                    }
                    {...register('terms_of_service')}
                    value='true'
                  />
                  {errors.terms_of_service?.message && (
                    <p className='mt-1 text-xs text-brand-danger'>
                      {errors.terms_of_service?.message}
                    </p>
                  )}
                  <FormCheckBox
                    label={
                      <div className='text-heading text-xs focus:text-brand-dark focus:outline-none'>
                        {
                          'I agree that I am of legal drinking age in my country'
                        }
                      </div>
                    }
                    {...register('legal_age')}
                    value='true'
                  />
                  {errors.legal_age?.message && (
                    <p className='mt-1 text-xs text-brand-danger'>
                      {errors.legal_age?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='relative mt-5'>
                <Button
                  type='submit'
                  loading={isLoading}
                  disabled={!isValid}
                  className='h-11 w-full text-base tracking-normal md:h-12'
                  variant='formButton'
                >
                  {'Create Account'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
