import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function acceptJourney(journey, driverId) {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.patch(
        `https://api-gateway-solfonte.cloud.okteto.net/journey/accept/${journey.id}`,
        {
          idDriver: driverId,
          vip: false,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
    );
    const journeys = response.data;

    await axios.post(
        'https://api-gateway-solfonte.cloud.okteto.net/notification',
        {
          user_id: journey.idPassenger,
          title: 'Viaje Aceptado!',
          body: 'Tu chofer esta en camino',
          data: {id: journey.id, status: journeys.status},
        },
    );
    return journeys;
  } catch (err) {
    alert(err);
  }
}
