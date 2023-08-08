import { useAppSelector } from '../redux/hooks';

import { selectUser } from '../redux/auth/selectors';

export const useAuth = () => {
  const { user, isError, isLoading } = useAppSelector(selectUser);

  const isLoggedIn = !!user;

  return { isLoggedIn, user, isError, isLoading };
};
