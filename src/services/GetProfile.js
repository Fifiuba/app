import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {USER_SERVICE_URL} from '@env';

export default async function getProfile() {
  try {
    const token = await AsyncStorage.getItem('token');
    const userType = await AsyncStorage.getItem('user_type');
    const config = {
      params: {
        'user_type': userType,
      },
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await axios.get(`https://backend-agustinaa235.cloud.okteto.net/users/me/`, config);
    console.log('response_data:', response.data);
    return response.data;
  } catch (error) {
    return error;
  }
}
