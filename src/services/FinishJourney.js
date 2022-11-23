import axios from 'axios';

export default async function finishJourney(journey) {
  try {
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/finish/${journey.id}`,
    );
    const journeys = response.data;
    
    await axios.post(
        'https://notifications-service-alejovillores.cloud.okteto.net/notification', {
          user_id: journey.idPassenger,
          title: 'Viaje Terminado!',
          body: 'Has llegado a destino!',
          data: {id: journey.id, status: journeys.status},
        });
    return journeys;
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
