import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import ForgotPasswordForm from '@components/auth/forget-password/forget-password';
import Logo from '@components/ui/logo';

import { SUPER_ADMIN } from '@utils/constants';
import { parseContextCookie } from '@utils/parse-cookie';
import { ROUTES } from '@utils/routes';

export const getServerSideProps: GetServerSideProps = async ({
  context,
}: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (cookies?.auth_token) {
    if (cookies?.auth_permissions?.includes(SUPER_ADMIN)) {
      return {
        redirect: { destination: ROUTES.DASHBOARD, permanent: false },
      };
    }
  }
  return {
    props: {},
  };
};

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  return (
    <div className='flex h-screen items-center justify-center bg-light sm:bg-gray-100'>
      <div className='m-auto w-full max-w-sm rounded bg-light p-5 sm:p-8 sm:shadow'>
        <div className='mb-2 flex justify-center'>
          <Logo />
        </div>
        <h3 className='mb-6 mt-4 text-center text-base italic text-body'>
          {t('form:form-title-forgot-password')}
        </h3>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
