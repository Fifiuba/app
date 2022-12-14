import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getDriverInfo = async (id) => {
  console.log('get user info service:', id);
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
        `https://api-gateway-solfonte.cloud.okteto.net/users/${id}`,
        {
          params: {
            user_type: 'driver',
          },
          headers: {Authorization: `Bearer ${token}`},
        },
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getDriverInfo;
