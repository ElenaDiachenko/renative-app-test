import { useOrientation } from './useOrientation';

export const useLoaderSize = (): number => {
  const { isPortrait, width, height } = useOrientation();
  const size = isPortrait ? width / 6 : height / 6;
  return size;
};
