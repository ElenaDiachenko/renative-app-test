import type {
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';

import type {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeStackNavigatorParamList = {
  Main: NavigatorScreenParams<DrawerParamList>;
  Details: {
    movieId: string;
  };
  Video: {
    uri: string;
  };
};

export type HomeStackScreenProps<T extends keyof HomeStackNavigatorParamList> =
  {
    navigation: StackNavigationProp<HomeStackNavigatorParamList, T>;
    route: RouteProp<HomeStackNavigatorParamList, T>;
  };

/////////////////

export type DrawerParamList = {
  Home: undefined;
  Library: undefined;
  Filters: undefined;
};

export type HomeDrawerScreenProps<T extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, T> & {
    navigation: DrawerNavigationProp<DrawerParamList, keyof DrawerParamList>;
    route: RouteProp<DrawerParamList, T>;
  };

// export type HomeDrawerScreenProps<T extends keyof DrawerParamList> =
//   DrawerNavigationProp<DrawerParamList, T>;

////////////////

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends HomeStackNavigatorParamList,
        AuthStackParamList {}
  }
}
