import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {isValid} from '../utils/ValueIsValid';
import {USER_SERVICE_URL} from '@env';

const getFields = (data) => {
  const userInfo = {};
  const userTypeInfo = {};

  const keys = Object.getOwnPropertyNames(data);

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const value = data[key];
    if (isValid(value)) {
      if (key == 'default_address' || key == 'car_model' ||
      key == 'license_plate') {
        userTypeInfo[key] = value;
      } else {
        userInfo[key] = value;
      }
    }
  };
  return [userInfo, userTypeInfo];
};

export default async function editProfile(data, setSaved, setMsg) {
  console.log('Edit profile');
  try {
    const userType = await AsyncStorage.getItem('user_type');
    const params = {
      'user_type': userType,
      'fields': getFields(data),
    };

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const response =
      await axios.patch(`${USER_SERVICE_URL}/users/me/`, params, config);
    setSaved(true);
    setMsg('Edición exitosa');
    return response.data;
  } catch (error) {
    setSaved(false);
    setMsg('Edición fallida');
    console.error(error);
    return null;
  }
}
