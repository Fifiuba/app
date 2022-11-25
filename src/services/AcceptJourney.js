import axios from 'axios';

export default async function acceptJourney(journey, driverId) {
  console.log('Accept journey');
  try {
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/accept/${journey.id}`,
        {
          'idDriver': driverId,
          'vip': false,
        },
    );
    const journeys = response.data;

    await axios.post(
        'https://notifications-service-alejovillores.cloud.okteto.net/notification', {
          user_id: journey.idPassenger,
          title: 'Viaje Aceptado!',
          body: 'Tu chofer esta en camino',
          data: {id: journey.id, status: journeys.status},
        });
    return journeys;
  } catch (err) {
    throw err;
  }
}
