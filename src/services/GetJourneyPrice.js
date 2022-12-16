import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getJourneyPrice = async (distance) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
        'https://api-gateway-solfonte.cloud.okteto.net/journey/info',
        {
          params: {
            modality: 'standar',
            distance: distance,
          },
          headers: {Authorization: `Bearer ${token}`},
        },
    );
    console.log('price:', response.data.price);
    return response.data.price;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getJourneyPrice;
