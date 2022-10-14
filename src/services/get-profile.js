import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserInfo = async (userInfo) => {
  console.log('USER INFO');
  try {
    await AsyncStorage.setItem('name', userInfo.name);
    await AsyncStorage.setItem('email', userInfo.email);
    // await AsyncStorage.setItem('phone', userInfo.phone);
    // await AsyncStorage.setItem('age', userInfo.age);
  } catch (error) {
    console.log('ERROR USER INFO');
    alert(error.message);
    console.error(error);
    return nill;
  }
};

const setTypeUserInfo = async (typeUserInfo) => {
  console.log('TYPE USER INFO');
  try {
    // await AsyncStorage.setItem('id', typeUserInfo.id);
    // await AsyncStorage.setItem('score', typeUserInfo.score);
  } catch (error) {
    console.log('ERROR TYPE USER INFO');
    alert(error.message);
    console.error(error);
    return nill;
  }
};

export default async function getProfile() {
  try {
    const token = await AsyncStorage.getItem('token');
    const userType = await AsyncStorage.getItem('user_type');
    console.log('user_type:', userType);
    console.log('token:', token);
    const config = {
      params: {
        'user_type': userType,
      },
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('NUEVA VERSION');
    const response = await axios.get('http://192.168.0.76:8000/users/me/', config);
    console.log('response_data:', response.data);
    console.log('response_data:', response.data[0]);
    await setUserInfo(response.data[0]);
    await setTypeUserInfo(response.data[1]);
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error(error);
    return nill;
  }
}
