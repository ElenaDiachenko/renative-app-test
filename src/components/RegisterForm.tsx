import React, { FC, useReducer } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { CustomInput } from './ui';

import { reducer, validateInputField } from '../utils';
import { palette } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList, AuthStackScreenProps } from '../navigation/types';
import { useAuth } from '../hooks';
import { useAppDispatch } from '../redux/hooks';

import { register } from '../redux/auth/operations';
import { NextRouter } from 'next/router';
import { isPlatformWeb, isWebBased } from '@rnv/renative';
import { StackNavigationProp } from '@react-navigation/stack';

type RegisterFormProps = {
  router?: NextRouter;
};
const initialState: reducer.State = {
  username: '',
  email: '',
  password: '',
  errors: {},
};

const RegisterForm: FC<RegisterFormProps> = ({ router }) => {
  let navigation: StackNavigationProp<AuthStackParamList, 'Register'>;

  if (!isWebBased) {
    navigation = useNavigation();
  }

  const [state, dispatch] = useReducer(reducer.reducer, initialState);

  const reduxDispatch = useAppDispatch();
  const { isLoading } = useAuth();

  const handleFieldChange = (name: string, value: string) => {
    const validateError = validateInputField(name, value);
    dispatch({ type: 'SET_FIELD', field: name, value });
    dispatch({ type: 'SET_ERRORS', errors: { [name]: validateError } });
  };

  const handleSubmit = () => {
    const { username, email, password } = state;

    const usernameError = validateInputField('username', username || '');
    const emailError = validateInputField('email', email);
    const passwordError = validateInputField('password', password);

    dispatch({
      type: 'SET_ERRORS',
      errors: {
        username: usernameError,
        email: emailError,
        password: passwordError,
      },
    });

    if (!usernameError && !emailError && !passwordError) {
      const credentials = {
        username: username || '',
        email,
        password,
      };
      reduxDispatch(register(credentials));
    }
  };

  const { username = '', email, password, errors } = state;

  const navigateToLogin = () => {
    isWebBased ? router?.push('/login') : navigation?.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput
        placeholder="Username"
        value={username}
        onChangeText={(value) => handleFieldChange('username', value)}
        error={errors.username}
      />
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={(value) => handleFieldChange('email', value)}
        error={errors.email}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(value) => handleFieldChange('password', value)}
        error={errors.password}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.7}
        style={styles.button}
      >
        {isLoading ? (
          <ActivityIndicator size={25} color={palette.whiteColor} />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.containerLink}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={navigateToLogin} activeOpacity={0.7}>
          <Text style={styles.linkText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: isPlatformWeb ? '100vh' : '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: palette.mainBgColor,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: palette.whiteColor,
    marginBottom: 16,
  },

  error: {
    color: palette.warningText,
    marginBottom: 8,
  },
  button: {
    width: '35%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 16,
    backgroundColor: palette.accentColor,
  },
  buttonText: {
    color: palette.whiteColor,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 20,
  },
  containerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    marginRight: 8,
    fontSize: 18,
    color: palette.whiteColor,
  },
  linkText: {
    color: palette.accentColor,
    textDecorationLine: 'underline',
    fontSize: 18,
  },
});
