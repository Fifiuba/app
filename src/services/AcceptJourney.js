import axios from 'axios';

export default async function acceptJourney(journey) {
  try {
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/accept/${journey.id}`,
    );
    const journeys = response.data;
    
    const noti = await axios.post(
      'https://notifications-service-alejovillores.cloud.okteto.net/notification',{
        user_id: journey.user_id,
        title:'Viaje Aceptado!',
        body:'Tu chofer esta en camino',
        data: {id: journey.id, status: journeys.status}
      });
    console.log('noti response:' + noti)
    return journeys;
  } catch (err) {
    console.error(JSON.stringify(err));
    alert(err);
  }
}
