import { useEffect } from 'react';

import type { GetStaticPaths } from 'next';

import Loader from '@components/ui/loader/loader';

import { useLogoutMutation } from '@data/user/use-logout.mutation';

function SignOut() {
  const { mutate: logout } = useLogoutMutation();

  useEffect(() => {
    logout();
  }, []);

  return <Loader text='Logging off' />;
}

export default SignOut;

export const getStaticProps = async () => ({
  props: {},
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
