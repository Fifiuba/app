import axios from 'axios';

const getLastJourneysInfo = async () => {
  console.log('getting last journey');
  try {
    const response = await axios.get(
        'https://api-gateway-solfonte.cloud.okteto.net/journey',
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    if (error.message == 'Network Error') {
      alert('Problemas de conexión con el servidor');
    }
    return null;
  }
};

export default getLastJourneysInfo;
