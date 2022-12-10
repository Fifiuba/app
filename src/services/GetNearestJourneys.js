import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getNearestJourneys(location) {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
        'https://api-gateway-solfonte.cloud.okteto.net/journey/requested',
        {
          params: {
            location: `${location.latitude}, ${location.longitude}`,
          },
          headers: {Authorization: `Bearer ${token}`},
        },
    );
    const journeys = response.data;
    return journeys;
  } catch (err) {
    console.error(err);
  }
}
