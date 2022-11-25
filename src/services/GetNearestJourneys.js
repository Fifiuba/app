import axios from 'axios';

export default async function getNearestJourneys(location) {
  try {
    const response = await axios.get(
        'https://journey-service-solfonte.cloud.okteto.net/journey/requested',
        {
          params: {
            location: `${location.latitude}, ${location.longitude}`,
          },
          headers: {Authorization: `Bearer testig`},
        },
    );
    const journeys = response.data;
    return journeys;
  } catch (err) {
    console.error(err);
  }
}
