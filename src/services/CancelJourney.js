import axios from 'axios';

// import {JOURNEY_SERVICE_URL} from '@env';

const cancelJourney = async (journeyInfo) => {
  const id = journeyInfo.id;
  try {
    const response = await axios.patch(`https://journey-service-solfonte.cloud.okteto.net/journey/cancel/${id}`, {
    // const response = await
    // axios.patch(`http://192.168.0.76:9000/journey/cancel/${id}`, {
      'id': journeyInfo.id,
      'status': journeyInfo.status,
      'idPassenger': journeyInfo.idPassenger,
      'price': journeyInfo.price,
      'startOn': journeyInfo.startOn,
      'finishOn': journeyInfo.finishOn,
      'from': journeyInfo.from,
      'to': journeyInfo.to,
    });
    console.log('response cancel journey:', response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default cancelJourney;
