import { useAppSelector } from '../redux/hooks';

import { selectUser } from '../redux/auth/selectors';

export const useAuth = () => {
  const user = useAppSelector(selectUser);

  const isLoggedIn = !!user;

  return { isLoggedIn, user };
};
