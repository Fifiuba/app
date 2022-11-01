import axios from 'axios';

const getJourneyPrice = async (distance) => {
  try {
    const response = await axios.post('https://journey-service-solfonte.cloud.okteto.net/journey/info', {
      'modality': 'standar',
      'distance': distance,
    });
    return response.data.price;
  } catch (error) {
    if (error.message == 'Network Error') {
      alert('Problemas de conexión con el servidor');
    }
    return null;
  }
};

export default getJourneyPrice;
