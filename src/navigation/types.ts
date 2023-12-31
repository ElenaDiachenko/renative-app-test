import type {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';

import type {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  Main: NavigatorScreenParams<DrawerParamList>;
  Details: {
    movieId: string;
    prevRoute: string;
  };
  Video: {
    uri: string;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackNavigatorParamList> =
  {
    navigation: NativeStackNavigationProp<HomeStackNavigatorParamList, T>;
    route: RouteProp<HomeStackNavigatorParamList, T>;
  };

/////////////////

export type DrawerParamList = {
  Home: undefined;
  Library: undefined;
};

export type HomeDrawerScreenProps<T extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, T> & {
    navigation: DrawerNavigationProp<DrawerParamList, keyof DrawerParamList>;
    route: RouteProp<DrawerParamList, T>;
  };

////////////////

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends HomeStackNavigatorParamList,
        AuthStackParamList {}
  }
}
