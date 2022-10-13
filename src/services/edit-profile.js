import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserInfo = (userInfo) => {
  AsyncStorage.setItem('name', userInfo.name);
  AsyncStorage.setItem('email', userInfo.email);
  AsyncStorage.setItem('phone', userInfo.phone);
  AsyncStorage.setItem('age', userInfo.age);
};

export default async function editProfile(data) {
  try {
    const response = await axios.patch('http://192.168.0.76:8000/users/me', data);
    console.log('response:', response);
    setUserInfo(response);
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error(error.message);
    return nill;
  }
}
