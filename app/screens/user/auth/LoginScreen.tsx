import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard, Text} from 'react-native';
import {RepositoryFactory} from '../../../repositories/RepositoryFactory';

const authRepository = RepositoryFactory.get('auth');

const LoginScreen = (props: any) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    setLoading(true);
    Keyboard.dismiss();

    let data = {
      email: email,
      password: password,
    };

    authRepository
      .sendOtp(data)
      .then((res: any) => {
        console.log('res', res);
      })
      .catch((err: any) => {
        console.error('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Text>Login Screen</Text>
    </>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
