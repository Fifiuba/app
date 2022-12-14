import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLastJourneysInfo = async () => {
  console.log('getting last journey');
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const response = await axios.get(
        'https://api-gateway-solfonte.cloud.okteto.net/journey', config,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getLastJourneysInfo;
