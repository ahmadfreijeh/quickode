import axios from 'axios';
import publicIP from 'react-native-public-ip';
import DeviceInfo from 'react-native-device-info';
import {I18nManager, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const baseURL = `${API_URL}/api`;

const getClientUniqueId = async () => {
  try {
    return await DeviceInfo.getUniqueId();
  } catch (error) {
    console.error('Failed to get unique device ID:', error);
    return '';
  }
};

const getPublicIP = async () => {
  try {
    return await publicIP();
  } catch (error) {
    console.error('Failed to get public IP:', error);
    return '';
  }
};

const fetchClient = async () => {
  const uniqueId = await getClientUniqueId();
  const ip = await getPublicIP();
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    async config => {
      config.headers['ip'] = ip;
      config.headers['country'] = 'LB';
      config.headers['os'] = Platform.OS;
      config.headers['device-id'] = uniqueId;
      config.headers['platform'] = 'customer';
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json';
      config.headers['lang'] = I18nManager.isRTL ? 'ar' : 'en';
      config.headers['version'] = DeviceInfo.getVersion();

      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const apiToken = await AsyncStorage.getItem('api_token');
        if (apiToken) {
          config.headers['Authorization'] = `Bearer ${apiToken}`;
        }
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export default fetchClient();
