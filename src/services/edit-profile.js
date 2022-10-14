import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserInfo = async (userInfo) => {
  console.log('USER INFO');
  try {
    // await AsyncStorage.setItem('name', userInfo.name);
    // await AsyncStorage.setItem('email', userInfo.email);
    // await AsyncStorage.setItem('phone', userInfo.phone);
    console.log('age:', userInfo.age);
    await AsyncStorage.setItem('age', toString(userInfo.age));
  } catch (error) {
    console.log('ERROR USER INFO');
    alert(error.message);
    console.error(error);
    return nill;
  }
};

const getUserInfo = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
};

export default async function editProfile(data) {
  try {
    console.log('DATA:', data);
    const userType = await getUserInfo('user_type');
    const token = await getUserInfo('token');
    console.log('user type:', userType);
    console.log('token:', token);
    const params = {
      'user_type': userType,
      'fields': [
        {
          'age': data.age,
        },
        {},
      ],
    };
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('params:', params);
    console.log('config:', config);
    const response = await axios.patch('http://192.168.0.76:8000/users/me/', params, config);
    console.log('response:', response);
    console.log('response data:', response.data);
    if (response.data) {
      await setUserInfo(response.data[0]);
    }
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error(error.message);
    return nill;
  }
}
