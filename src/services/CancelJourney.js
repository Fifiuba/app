import axios from 'axios';

// import {JOURNEY_SERVICE_URL} from '@env';

const cancelJourney = async (journeyInfo) => {
  try {
    // const response = await axios.post(`${JOURNEY_SERVICE_URL}/journey/`, {
    const response = await axios.post('http://192.168.0.76:9000/journey/', {journeyInfo});
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default cancelJourney;
