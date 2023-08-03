// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { DrawerParamList, HomeDrawerScreenProps } from '../navigation/types';
// import Icon from 'react-native-vector-icons/Ionicons';
// import * as Screens from '../screens';
// import { palette } from '../styles';
// import {
//   DrawerContentComponentProps,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';

// export const screens = {
//   Home: 'Home' as keyof DrawerParamList,
//   Library: 'Library' as keyof DrawerParamList,
//   Filters: 'Filters' as keyof DrawerParamList,
// };

// const drawerRoutes = [
//   {
//     name: screens.Home,
//     focusedRoute: screens.Home,
//     title: 'Home',
//     icon: (focused: boolean) => (
//       <Icon
//         name={focused ? 'home' : 'home-outline'}
//         size={30}
//         color={focused ? palette.whiteColor : palette.footerTextColor}
//       />
//     ),
//   },
//   {
//     name: screens.Library,
//     focusedRoute: 'Library',
//     title: 'Library',
//     icon: (focused: boolean) => (
//       <Icon
//         name={focused ? 'heart' : 'heart-outline'}
//         size={30}
//         color={focused ? palette.whiteColor : palette.footerTextColor}
//       />
//     ),
//   },
//   {
//     name: screens.Filters,
//     focusedRoute: screens.Filters,
//     title: 'Filters',
//     icon: (focused: boolean) => (
//       <Icon
//         name={focused ? 'grid' : 'grid-outline'}
//         size={30}
//         color={focused ? palette.whiteColor : palette.footerTextColor}
//       />
//     ),
//   },
// ];

// type MenuType = {
//   state: DrawerContentComponentProps['state'];
// };
// const DrawerMenu: React.FC<MenuType> = ({ state }) => {
//   const navigation =
//     useNavigation<HomeDrawerScreenProps<'Home'>['navigation']>();
//   return (
//     <View style={{ flexDirection: 'column' }}>
//       {drawerRoutes.map((route, index) => {
//         const focused = index === state.index;
//         return (
//           <DrawerItem
//             key={route.name}
//             icon={() => route.icon(focused)}
//             label={() => (
//               <Text
//                 style={focused ? styles.drawerLabelFocused : styles.drawerLabel}
//               >
//                 {route.title}
//               </Text>
//             )}
//             onPress={() => navigation.navigate(route.name)}
//             style={[
//               styles.drawerItem,
//               focused ? styles.drawerItemFocused : null,
//             ]}
//           />
//         );
//       })}
//     </View>
//   );
// };

// export default DrawerMenu;

// const styles = StyleSheet.create({
//   drawerLabel: {
//     fontSize: 16,
//     color: palette.footerTextColor,
//   },
//   drawerLabelFocused: {
//     fontSize: 16,
//     color: palette.whiteColor,
//     fontWeight: '600',
//   },
//   drawerItem: {
//     height: 50,
//     justifyContent: 'center',
//   },
//   drawerItemFocused: {
//     backgroundColor: palette.accentColor,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerParamList, HomeDrawerScreenProps } from '../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';

import { palette } from '../styles';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

export const screens = {
  Home: 'Home' as keyof DrawerParamList,
  Library: 'Library' as keyof DrawerParamList,
  Filters: 'Filters' as keyof DrawerParamList,
};

const drawerRoutes = [
  {
    name: screens.Home,
    focusedRoute: screens.Home,
    title: 'Home',
    icon: (focused: boolean) => (
      <Icon
        name={focused ? 'home' : 'home-outline'}
        size={30}
        color={focused ? palette.whiteColor : palette.footerTextColor}
      />
    ),
  },
  {
    name: screens.Library,
    focusedRoute: 'Library',
    title: 'Library',
    icon: (focused: boolean) => (
      <Icon
        name={focused ? 'heart' : 'heart-outline'}
        size={30}
        color={focused ? palette.whiteColor : palette.footerTextColor}
      />
    ),
  },
  {
    name: screens.Filters,
    focusedRoute: screens.Filters,
    title: 'Filters',
    icon: (focused: boolean) => (
      <Icon
        name={focused ? 'grid' : 'grid-outline'}
        size={30}
        color={focused ? palette.whiteColor : palette.footerTextColor}
      />
    ),
  },
];

type MenuType = {
  state: DrawerContentComponentProps['state'];
};

const DrawerMenu: React.FC<MenuType> = ({ state }) => {
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Home'>['navigation']>();

  return (
    <View style={{ flexDirection: 'column' }}>
      {drawerRoutes.map((route, index) => {
        const currentRoute = index === state.index;
        return (
          <TouchableOpacity
            key={route.name}
            activeOpacity={0.6}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.drawerItem,
              currentRoute ? styles.drawerItemFocused : null,
            ]}
          >
            {route.icon(currentRoute)}
            <Text
              style={[
                styles.drawerLabel,
                currentRoute ? styles.drawerLabelFocused : null,
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 16,
    color: palette.footerTextColor,
    marginLeft: 12,
  },
  drawerLabelFocused: {
    color: palette.whiteColor,
    fontWeight: '600',
  },
  drawerItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 10,
  },
  drawerItemFocused: {
    backgroundColor: palette.accentColor,
  },
});
