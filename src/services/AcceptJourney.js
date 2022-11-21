import axios from 'axios';

export default async function acceptJourney(journey, driverId) {
  console.log('driver id:', driverId);
  try {
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/accept/${journey.id}`,
        {
          "idDriver": driverId,
          "vip": false,
        }
    );

    const journeys = response.data;
    return journeys;
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
