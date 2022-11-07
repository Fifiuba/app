import axios from 'axios';

export default async function acceptJourney(journey) {
  try {
    console.log(`https://journey-service-solfonte.cloud.okteto.net/journey/accept/${journey.id}`)
    const response = await axios.patch(`https://journey-service-solfonte.cloud.okteto.net/journey/accept/${journey.id}`);

    const journeys = response.data;
    console.log(journeys)
    return journeys;
    
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
