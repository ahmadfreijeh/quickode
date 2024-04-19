import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {setLoaded} from '../redux/slices/appSlice';
import {setApiToken, setUser} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import {Colors} from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFcmToken,
  registerListenerWithFCM,
} from '../utils/helpers/fcmHelpers';

import {RepositoryFactory} from '../repositories/RepositoryFactory';

const notificationRepository = RepositoryFactory.get('notification');
const userRepository = RepositoryFactory.get('user');

const SplashScreen = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });

    checkUser();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return () => {
      unsubscribe();
    };
  }, []);

  const storeFcmToken = async (fcmToken: string, unauthorized: boolean) => {
    notificationRepository
      .storeFcmToken({
        token: fcmToken,
        unauthorized: unauthorized,
      })
      .then((res: any) => {
        console.log(`FCM Token Stored: ${fcmToken}`);
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const checkUser = async () => {
    let user = await AsyncStorage.getItem('user');
    let apiToken = await AsyncStorage.getItem('api_token');

    await getFcmToken()
      .then(token => {
        let unauthorized = true;
        if (user != null && apiToken != null) {
          unauthorized = false;
        }
        storeFcmToken(token, unauthorized);
      })
      .catch(e => {
        console.error(e);
      });

    if (user != null && apiToken != null) {
      dispatch(setApiToken(apiToken));
      userRepository
        .getProfile()
        .then(res => {
          let profile = res.data.data;
          profile.api_token = apiToken;
          profile.actor = 'main';
          AsyncStorage.setItem('user', JSON.stringify(profile));
          dispatch(setUser(profile));
          dispatch(setLoaded(true));
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      dispatch(setLoaded(true));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginBottom: 18}}>
        <Text>App Name</Text>
      </View>
      <ActivityIndicator size="large" color={Colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
