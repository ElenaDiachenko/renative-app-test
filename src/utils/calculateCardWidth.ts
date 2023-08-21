import { isFactorMobile, isPlatformAndroid } from '@rnv/renative';

export const calculateCardWidth = (isPortrait: boolean, width: number) => {
  let columnCount: number = 0;

  columnCount =
    isFactorMobile && isPlatformAndroid
      ? isPortrait
        ? width < 600
          ? 2
          : 3
        : width < 900
        ? 3
        : 4
      : 5;
  return (width - columnCount * 10) / columnCount;
};
