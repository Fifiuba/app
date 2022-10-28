import axios from 'axios';

const cancelJourney = async (journeyInfo) => {
  const id = journeyInfo.id;
  try {
    const response = await axios.patch(`https://journey-service-solfonte.cloud.okteto.net/journey/cancel/${id}`, {
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
