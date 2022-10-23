import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {isValid} from '../utils/ValueIsValid';
import {constants} from '../utils/Constants';

const getFields = (data) => {
  const userInfo = {};
  const userTypeInfo = {};

  const keys = Object.getOwnPropertyNames(data);
  console.log('keys:', keys);

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const value = data[key];
    if (isValid(value)) {
      if (key == constants.PASSENGER_FIELD) {
        userTypeInfo[key] = value;
      } else {
        userInfo[key] = value;
      }
    }
  };
  return [userInfo, userTypeInfo];
};

export default async function editProfile(data, setEdit, setMsg) {
  console.log('Edit profile');
  try {
    const userType = await AsyncStorage.getItem('user_type');
    const params = {
      'user_type': userType,
      'fields': getFields(data),
    };
    console.log('params:', params);

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('config:', config);

    const response = await axios.patch('http://192.168.0.76:8000/users/me/', params, config);
    console.log('response data:', response.data);
    setEdit(true);
    setMsg('Edición exitosa');
    return response.data;
  } catch (error) {
    setEdit(false);
    setMsg('Edición fallida');
    console.error(error);
    return null;
  }
}
