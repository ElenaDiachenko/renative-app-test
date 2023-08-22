import { useOrientation } from './useOrientation';

export const useLoaderSize = (): number => {
  const { isPortrait, width, height } = useOrientation();
  console.log(isPortrait, width, height);
  const size = isPortrait ? width / 6 : height / 6;
  console.log(size);
  return size;
};
