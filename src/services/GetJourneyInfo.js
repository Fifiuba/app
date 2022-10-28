import axios from 'axios';

const getJourneyInfo = async (id) => {
  try {
    const response = await axios.get(`https://journey-service-solfonte.cloud.okteto.net/journey/${id}`, {'id': id});
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    if (error.message == 'Network Error') {
      alert('Problemas de conexión con el servidor');
    }
    return null;
  }
};

export default getJourneyInfo;
