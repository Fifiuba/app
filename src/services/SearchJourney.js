import axios from 'axios';

const searchJourney = async (origin, destination, userId) => {
  try {
    const response = await axios.post('http://192.168.0.76:9000/journey/', {
      'modality': 'standar',
      'distance': 120,
      'idPassenger': userId,
      'from': [origin.latitude, origin.longitude],
      'to': [destination.latitude, destination.longitude],
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default searchJourney;
