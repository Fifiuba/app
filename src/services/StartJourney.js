import axios from 'axios';

export default async function startJourney(journey) {
  try {
    console.log(journey.id);
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/start/${journey.id}`,
    );
    const res = response.data;

    const noti = await axios.post(
      'https://notifications-service-alejovillores.cloud.okteto.net/notification',{
        user_id: journey.user_id,
        title:'Su viaje ha comenzado!',
        body:'Ya estas en viaje, te avisaremos cuando llegues a destino',
        data: {id: journey.id, status: res.status}
    });

    return res;
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
