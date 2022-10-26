import axios from 'axios';

import {JOURNEY_SERVICE_URL} from '@env';

const searchJourney = async (origin, destination, userId, distance) => {
  try {
    const response = await axios.post(`${JOURNEY_SERVICE_URL}/journey/`, {
      'modality': 'standar',
      'distance': distance,
      'idPassenger': userId,
      'from': [origin.latitude, origin.longitude],
      'to': [destination.latitude, destination.longitude],
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default searchJourney;
