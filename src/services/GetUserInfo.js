import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserInfo = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('get user info service:' + id);

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await axios.get(
        `https://api-gateway-solfonte.cloud.okteto.net/users/info/${id}`,
        config,
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getUserInfo;
