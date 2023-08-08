import React, { useReducer, useEffect } from 'react';
// import { shallow } from 'zustand/shallow';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { useStore } from '../stores/store';
import { reducer, validateInputField } from '../utils';
import { palette } from '../styles';
import { CustomInput } from './ui';
import { AuthStackScreenProps } from '../navigation/types';
import { useAuth } from '../hooks';
import { useAppDispatch } from '../redux/hooks';

import { logIn } from '../redux/auth/operations';

const initialState: reducer.State = {
  email: '',
  password: '',
  errors: {},
};

const LoginForm = () => {
  const navigation =
    useNavigation<AuthStackScreenProps<'Login'>['navigation']>();
  const [state, dispatch] = useReducer(reducer.reducer, initialState);
  const reduxDispatch = useAppDispatch();
  const { isLoading } = useAuth();

  const handleFieldChange = (name: string, value: string) => {
    const validateError = validateInputField(name, value);
    dispatch({ type: 'SET_FIELD', field: name, value });
    dispatch({ type: 'SET_ERRORS', errors: { [name]: validateError } });
  };

  const handleSubmit = () => {
    const { email, password } = state;

    const emailError = validateInputField('email', email);
    const passwordError = validateInputField('password', password);

    dispatch({
      type: 'SET_ERRORS',
      errors: { email: emailError, password: passwordError },
    });

    if (!emailError && !passwordError) {
      const credentials = {
        email,
        password,
      };
      reduxDispatch(logIn(credentials));
    }
  };

  const { email, password, errors } = state;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
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
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.containerLink}>
        <Text style={styles.text}>Want to create a new account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.7}
        >
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '40%',
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
