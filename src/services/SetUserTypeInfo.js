import axios from 'axios';
import {USER_SERVICE_URL} from '@env';

const getFields = (data) => {
  const userInfo = {};
  const typeUserInfo = {};

  const keys = Object.getOwnPropertyNames(data);
  console.log('keys:', keys);

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const value = data[key];
    if (value != '' || value != 0) {
      typeUserInfo[key] = value;
    }
  };
  return [userInfo, typeUserInfo];
};

export default async function setUserTypeInfo(data, userId, userType) {
  console.log('setUserTypeInfo');
  try {
    console.log('user_id:', userId);
    const params = {
      'user_type': userType,
      'fields': getFields(data),
    };
    console.log('params:', params);
    const response = await axios.patch(`${USER_SERVICE_URL}/users/${userId}`, params);
    console.log('response data:', response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.detail);
    console.error(error.response.data.detail);
    return null;
  }
}

