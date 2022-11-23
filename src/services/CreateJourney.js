import axios from 'axios';

const createJourney = async (origin, destination, userId, distance) => {
  try {
    const response = await axios.post(
        'https://api-gateway-solfonte.cloud.okteto.net/journey/',
        {
          modality: 'standar',
          distance: distance,
          idPassenger: userId,
          from: [origin.latitude, origin.longitude],
          to: [destination.latitude, destination.longitude],
        },
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default createJourney;
