import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromAsyncStorage = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem('persist:state');

    if (value !== null) {
      const state = JSON.parse(value);
      const auth = JSON.parse(state.auth);

      const token = auth?.user?.token;
      if (token) {
        return token;
      }
    }
    return '';
  } catch (error) {
    console.log('Error:', error);
    return '';
  }
};
