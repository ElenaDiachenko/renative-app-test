import { isPlatformWeb, isWebBased } from '@rnv/renative';
import { Dimensions, StyleSheet } from 'react-native';
import { MAX_WIDTH_WEB } from '../utils/constants';

export const palette = {
  accentColor: '#5dadef',
  blackColor: '#000000',
  whiteColor: '#ffffff',
  warningText: '#ff001b',
  footerTextColor: '#545454',
  mainBgColor: '#303030',
  modalGreyText: '#8c8c8c',
  modalNumberGreyBg: '#f7f7f7',
  footerBgColor: '#f7f7f7',
  paginationArrowBg: '#f7f7f7',
};
export const commonStyles = StyleSheet.create({
  container: {
    backgroundColor: palette.mainBgColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: isPlatformWeb ? MAX_WIDTH_WEB : '100%',
    marginHorizontal: isPlatformWeb ? 'auto' : 0,
  },

  text: {
    color: palette.whiteColor,
  },
  title: {
    color: palette.whiteColor,
    fontSize: 35,
  },
  borderInit: { borderColor: 'transparent', borderWidth: 1, borderRadius: 5 },
});

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;
