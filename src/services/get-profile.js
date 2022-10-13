import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserInfo = (userInfo) => {
  AsyncStorage.setItem('name', userInfo.name);
  AsyncStorage.setItem('email', userInfo.email);
  AsyncStorage.setItem('phone', userInfo.phone);
  AsyncStorage.setItem('age', userInfo.age);
};

export default async function getProfile() {
  try {
    const token = await AsyncStorage.getItem('token');
    const userType = await AsyncStorage.getItem('user_type');
    console.log('user_type:', userType);
    console.log('token:', token);
    const params = {
      'user_type': userType,
    };
    const config = {
      headers: {'Authorization': `Bearer ${token}`},
    };
    const response = await axios.get('http://192.168.0.76:8000/users/me', params, config);
    console.log('response:', response);
    setUserInfo(response);
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error(error);
    return nill;
  }
}
