import axios from 'axios';

export default async function acceptJourney(journey) {
  try {
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/accept/${journey.id}`,
    );

    const journeys = response.data;
    return journeys;
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
