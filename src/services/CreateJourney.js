import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createJourney = async (origin, destination, userId, distance) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
        'https://api-gateway-solfonte.cloud.okteto.net/journey/',
        {
          modality: 'standar',
          distance: distance,
          idPassenger: userId,
          from: [origin.latitude, origin.longitude],
          to: [destination.latitude, destination.longitude],
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default createJourney;
