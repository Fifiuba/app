import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserInfo = async (id) => {
  console.log('get user info service:', id);
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await axios.get(
        `https://backend-agustinaa235.cloud.okteto.net/users/info/${id}`,
        config,
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    if (error.message == 'Network Error') {
      alert('Problemas de conexión con el servidor');
    }
    return null;
  }
};

export default getUserInfo;
