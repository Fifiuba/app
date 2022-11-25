import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function startJourney(journey) {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/start/${journey.id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
    );
    const res = response.data;

    await axios.post(
        'https://notifications-service-alejovillores.cloud.okteto.net/notification', {
          user_id: journey.idPassenger,
          title: 'Su viaje ha comenzado!',
          body: 'Ya estas en viaje, te avisaremos cuando llegues a destino',
          data: {id: journey.id, status: res.status},
        });

    return res;
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
