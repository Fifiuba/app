import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isModified = async (key, newValue) => {
  const value = await AsyncStorage.getItem(key);
  return value != newValue;
};

const updateUserInfo = async (userInfo) => {
  try {
    const keys = Object.getOwnPropertyNames(userInfo);
    for (let idx = 0; idx < keys.length; idx++) {
      const key = keys[idx];
      const value = userInfo[key];
      if (isModified(key, value)) {
        let newValue;
        if (key == 'age' || key == 'id') {
          newValue = value.toString();
        } else {
          newValue = value;
        }
        if (newValue) {
          await AsyncStorage.setItem(key, newValue);
        }
      }
    }
  } catch (error) {
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

const getFields = (data) => {
  const userInfo = {};
  const typeUserInfo = {};

  const keys = Object.getOwnPropertyNames(data);
  console.log('keys:', keys);

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const value = data[key];
    if (value != '' || value != 0) {
      userInfo[key] = value;
    }
    console.log('userInfo:', userInfo);
  };
  return [userInfo, typeUserInfo];
};

export default async function editProfile(data) {
  console.log('Edit profile');
  try {
    const userType = await getUserInfo('user_type');
    const params = {
      'user_type': userType,
      'fields': getFields(data),
    };
    console.log('params:', params);

    const token = await getUserInfo('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('config:', config);

    const response = await axios.patch('http://192.168.0.76:8000/users/me/', params, config);
    console.log('response data:', response.data);
    if (response.data) {
      await updateUserInfo(response.data[0]);
    }
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error(error.message);
    return null;
  }
}
