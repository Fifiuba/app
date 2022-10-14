import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserInfo = async (userInfo) => {
  try {
      const keys = Object.getOwnPropertyNames(userInfo);
      for (let idx = 0; idx < keys.length; idx++) {
          let key = keys[idx];
          let value = userInfo[key];
          if (value) {
              if (key == 'age' || key == 'id') {
                await AsyncStorage.setItem(key, value.toString());
              } else {
                await AsyncStorage.setItem(key, value);
              } 
          }
      }
  } catch (error) {
      console.error(error.message);
      alert(error.message);
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
    const response = await axios.get('http://192.168.0.76:8000/users/me/', config);
    console.log('response_data:', response.data[0]);
    await setUserInfo(response.data[0]);
    return response.data[0];
  } catch (error) {
    alert(error.message);
    console.error(error);
    return nill;
  }
}
