import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getJourneyInfo = async (id) => {
  console.log('get journey info service');
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
        `https://api-gateway-solfonte.cloud.okteto.net/journey/${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getJourneyInfo;
