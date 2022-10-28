import axios from 'axios';

// import {JOURNEY_SERVICE_URL} from '@env';

const createJourney = async (origin, destination, userId, distance) => {
  try {
    const response = await axios.post('https://journey-service-solfonte.cloud.okteto.net/journey/', {
    // const response = await axios.post('http://192.168.0.76:9000/journey/', {
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

export default createJourney;
