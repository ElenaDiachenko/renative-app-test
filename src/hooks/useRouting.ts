import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const useRouting = () => {
  const { user, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const asPath = router.asPath;
    const shouldRedirect = user;

    if (shouldRedirect && (asPath === '/login' || asPath === '/register')) {
      router.replace('/');
    }
    if (!user && asPath === '/library') {
      router.replace('/login');
    }
  }, [user]);
};
