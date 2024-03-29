import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function finishJourney(journey) {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await axios.patch(
        `https://api-gateway-solfonte.cloud.okteto.net/journey/finish/${journey.id}`,
        {},
        config,
    );
    const journeys = response.data;

    await axios.post(
        'https://api-gateway-solfonte.cloud.okteto.net/notification',
        {
          user_id: journey.idPassenger,
          title: 'Viaje Terminado!',
          body: 'Has llegado a destino!',
          data: {id: journey.id, status: journeys.status},
        },
    );
    return journeys;
  } catch (err) {
    console.log('error:', err.message);
    return null;
  }
}
