import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {USER_SERVICE_URL} from '@env';

export default async function scoreUser(userType, score, userId) {
  console.log('Score user');
  try {
    const params = {
      'user_type': userType,
      'score': score,
    };
    console.log('params:', params);

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('config:', config);
    /* eslint-disable max-len */
    const response =
      await axios.patch(`${USER_SERVICE_URL}/users/score/${userId}`, params, config);
    console.log('response data:', response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.detail);
    console.error(error.response.data.detail);
    return null;
  }
}
