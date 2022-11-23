import axios from 'axios';

const getJourneyPrice = async (distance) => {
  try {
    const response = await axios.get(
        'https://api-gateway-solfonte.cloud.okteto.net/journey/info',
        {
          params: {
            modality: 'standar',
            distance: distance,
          },
        },
    );
    console.log('price:', response.data.price);
    return response.data.price;
  } catch (error) {
    if (error.message == 'Network Error') {
      alert('Problemas de conexión con el servidor');
    }
    return null;
  }
};

export default getJourneyPrice;
