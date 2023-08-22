import React, { PropsWithChildren, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { commonStyles } from '../../styles';
import { useAppDispatch } from '../../redux/hooks';
import { checkStatus } from '../../redux/auth/operations/index.web';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';

type ContainerProps = PropsWithChildren<{}>;

const Container: React.FC<ContainerProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const isAuthPage =
    router.pathname === '/login' || router.pathname === '/register';

  useEffect(() => {
    (async () => {
      await dispatch(checkStatus());
    })();
  }, []);

  if (!user && !isAuthPage) {
    router.replace('/login');
  }

  return (
    <View
      style={{ ...commonStyles.container, height: isAuthPage ? '100vh' : '' }}
    >
      {children}
    </View>
  );
};

export default Container;
