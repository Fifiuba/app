import axios from 'axios';

// import {JOURNEY_SERVICE_URL} from '@env';

const getJourneyInfo = async (distance) => {
  try {
    // const response =
    // await axios.post(`${JOURNEY_SERVICE_URL}/journey/info`, {
    const response = await axios.post('http://192.168.0.76:9000/journey/info', {
      'modality': 'standar',
      'distance': distance,
    });
    return response.data.price;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default getJourneyInfo;
