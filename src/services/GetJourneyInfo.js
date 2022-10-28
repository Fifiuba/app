import axios from 'axios';

import {JOURNEY_SERVICE_URL} from '@env';

const getJourneyInfo = async (distance) => {
  try {
    const response = await axios.post('https://journey-service-solfonte.cloud.okteto.net/journey/info', {
    // const response = await axios.post('http://192.168.0.76:9000/journey/info', {
      'modality': 'standar',
      'distance': distance,
    });
    return response.data.price;
  } catch (error) {
    console.error(error.message);
    if (error.message == 'Network Error') {
      alert('Problemas de conexión con el servidor');
    }
    return null;
  }
};

export default getJourneyInfo;
