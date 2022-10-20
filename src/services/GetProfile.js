import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getProfile() {
  console.log('Get profile');
  try {
    const token = await AsyncStorage.getItem('token');
    const userType = await AsyncStorage.getItem('user_type');
    const config = {
      params: {
        'user_type': userType,
      },
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('config:', config);
    const response = await axios.get('http://192.168.0.76:8000/users/me/', config);
    console.log('response_data:', response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.detail);
    console.error(error.response.data.detail);
    return null;
  }
}
