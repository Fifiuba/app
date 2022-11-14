import axios from 'axios';

export default async function startJourney(journey) {
  try {
    console.log(journey.id);
    const response = await axios.patch(
        `https://journey-service-solfonte.cloud.okteto.net/journey/start/${journey.id}`,
    );

    const res = response.data;
    return res;
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
